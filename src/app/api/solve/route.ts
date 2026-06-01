import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import connectToDatabase from '@/lib/mongodb';
import { IdeaAnalysis } from '@/models/IdeaAnalysis';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { idea, visitorId } = await req.json();

    if (!idea || !visitorId) {
      return new Response("Missing required fields", { status: 400 });
    }

    const result = await generateObject({
      model: google('gemini-1.5-pro-latest'),
      schema: z.object({
        architecture: z.string().describe("A 1-2 sentence description of the recommended system architecture for this idea."),
        techStack: z.array(z.string()).describe("A list of 4-8 specific technologies (e.g. Next.js, PostgreSQL, Redis) recommended for building this product."),
        complexity: z.enum(["Low", "Medium", "High", "Extreme"]).describe("The estimated technical complexity of the project."),
      }),
      prompt: `Analyze the following product idea and provide a technical architecture recommendation, a suggested tech stack, and an estimated complexity.
      
      Product Idea: ${idea}`,
    });

    const analysisData = result.object;

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
    return new Response("Internal Server Error", { status: 500 });
  }
}
