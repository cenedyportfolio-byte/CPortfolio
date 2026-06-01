import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import connectToDatabase from '@/lib/mongodb';
import { AiChat } from '@/models/AiChat';
import { Analytics } from '@/models/Analytics';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, visitorId } = await req.json();

    if (!visitorId) {
      return new Response("Missing visitorId", { status: 400 });
    }

    const systemPrompt = `You are Cenedy AI, an interactive portfolio assistant for Cenedy, a Full Stack Developer & Product Builder.
Your core message is "I take products from idea to impact."
You are helpful, concise, and speak highly of Cenedy's skills in Next.js, React, Node.js, MongoDB, and UI/UX design.
Always maintain a professional yet approachable tone. If asked about your identity, you are an AI assistant built specifically for Cenedy's portfolio platform.`;

    const result = streamText({
      model: google('gemini-1.5-pro-latest'),
      system: systemPrompt,
      messages,
      onFinish: async ({ text }) => {
        try {
          await connectToDatabase();

          let chatRecord = await AiChat.findOne({ visitorId });
          if (!chatRecord) {
            chatRecord = new AiChat({ visitorId, messages: [] });
          }

          const lastUserMessage = messages[messages.length - 1];
          chatRecord.messages.push({ role: 'user', content: lastUserMessage.content });
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

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
