import connectToDatabase from '@/lib/mongodb';
import { ContactMessage } from '@/models/ContactMessage';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response("Missing required fields", { status: 400 });
    }

    await connectToDatabase();

    const newMessage = new ContactMessage({
      name,
      email,
      message
    });

    await newMessage.save();

    return Response.json({ success: true });
  } catch (error) {
    console.warn("Contact API falling back to simulation mode:", error);
    return Response.json({ success: true, simulated: true });
  }

}
