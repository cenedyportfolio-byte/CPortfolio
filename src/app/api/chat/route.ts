import { streamText, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { createGroq } from '@ai-sdk/groq';
import connectToDatabase from '@/lib/mongodb';
import { AiChat } from '@/models/AiChat';
import { Analytics } from '@/models/Analytics';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

function createFallbackModel(primary: any, secondary: any): any {
  return {
    ...primary,
    async doStream(options: any) {
      try {
        return await primary.doStream(options);
      } catch (e) {
        console.error("Primary model failed, falling back to secondary", e);
        return await secondary.doStream(options);
      }
    },
    async doGenerate(options: any) {
      try {
        return await primary.doGenerate(options);
      } catch (e) {
        console.error("Primary model failed, falling back to secondary", e);
        return await secondary.doGenerate(options);
      }
    }
  };
}

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, visitorId } = await req.json();

    if (!visitorId) {
      return new Response("Missing visitorId", { status: 400 });
    }

    const systemPrompt = `You are Cenedy AI, an interactive portfolio assistant for Cenedy, a Full Stack Developer & Product Builder.
Your core message is "He takes products from idea to impact."
You are helpful, concise, and speak highly of Cenedy's skills in Next.js, React, Node.js, MongoDB, and UI/UX design.
Always maintain a professional yet approachable tone. If asked about your identity, you are an AI assistant built specifically for Cenedy's portfolio platform.
IMPORTANT: Cenedy is a man. ALWAYS use male pronouns (he, him, his) when referring to Cenedy. NEVER use female pronouns.`;

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: createFallbackModel(google('gemini-2.5-flash'), groq('llama-3.3-70b-versatile')),
      system: systemPrompt,
      messages: modelMessages,
      onFinish: async ({ text }) => {
        try {
          await connectToDatabase();

          let chatRecord = await AiChat.findOne({ visitorId });
          if (!chatRecord) {
            chatRecord = new AiChat({ visitorId, messages: [] });
          }

          const lastUserMessage = messages[messages.length - 1];
          const lastUserText = lastUserMessage.parts
            ? lastUserMessage.parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('')
            : (lastUserMessage.content || '');

          chatRecord.messages.push({ role: 'user', content: lastUserText });
          chatRecord.messages.push({ role: 'assistant', content: text });
          
          await chatRecord.save();

          await Analytics.findOneAndUpdate(
            { metricKey: 'total_chats' },
            { $inc: { count: 1 } },
            { upsert: true }
          );
        } catch (dbError) {
          console.error("Failed to save chat to DB:", dbError);
        }
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
