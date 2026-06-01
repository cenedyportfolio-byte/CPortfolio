import { generateObject, generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { createGroq } from '@ai-sdk/groq';
import connectToDatabase from '@/lib/mongodb';
import { IdeaAnalysis } from '@/models/IdeaAnalysis';
import { z } from 'zod';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || 'REDACTED',
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { idea, visitorId } = await req.json();

    if (!idea || !visitorId) {
      return new Response("Missing required fields", { status: 400 });
    }

    const schema = z.object({
      architecture: z.string().describe("A 1-2 sentence description of the recommended system architecture for this idea."),
      techStack: z.array(z.string()).describe("A list of 4-8 specific technologies (e.g. Next.js, PostgreSQL, Redis) recommended for building this product."),
      complexity: z.enum(["Low", "Medium", "High", "Extreme"]).describe("The estimated technical complexity of the project."),
    });
    
    const prompt = `Analyze the following product idea and provide a technical architecture recommendation, a suggested tech stack, and an estimated complexity.
      
      Product Idea: ${idea}`;

    let analysisData;
    try {
      const result = await generateObject({
        model: google('gemini-2.5-flash'),
        schema,
        prompt,
      });
      analysisData = result.object;
    } catch (geminiError) {
      console.warn("Gemini generation failed, falling back to Groq:", geminiError);
      const textResult = await generateText({
        model: groq('llama-3.3-70b-versatile'),
        prompt: prompt + "\n\nYou MUST return ONLY valid JSON matching this schema: { \"architecture\": \"string\", \"techStack\": [\"string\"], \"complexity\": \"Low\" | \"Medium\" | \"High\" | \"Extreme\" }. Do not wrap it in markdown code blocks.",
      });
      
      try {
        const cleanedText = textResult.text.replace(/```json/g, '').replace(/```/g, '').trim();
        analysisData = JSON.parse(cleanedText);
      } catch (parseError) {
        throw new Error("Failed to parse Groq response into JSON: " + textResult.text);
      }
    }

    // Save to MongoDB (best-effort, don't block the response)
    try {
      await connectToDatabase();
      const newAnalysis = new IdeaAnalysis({
        visitorId,
        idea,
        architecture: analysisData.architecture,
        techStack: analysisData.techStack,
        complexity: analysisData.complexity,
      });
      await newAnalysis.save();
    } catch (dbError) {
      console.error("Failed to save idea analysis to DB:", dbError);
    }

    return Response.json(analysisData);
  } catch (error) {
    console.error("Solve API Error:", error);
    const errorString = error instanceof Error ? error.stack || error.message : String(error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: errorString }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
