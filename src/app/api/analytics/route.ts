import connectToDatabase from '@/lib/mongodb';
import { Analytics } from '@/models/Analytics';
import { Visitor } from '@/models/Visitor';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch global analytics
    const rawMetrics = await Analytics.find({});
    const metrics = {
      page_views: 0,
      unique_visitors: 0,
      total_chats: 0,
    };

    rawMetrics.forEach(m => {
      if (m.metricKey === 'page_views') metrics.page_views = m.count;
      if (m.metricKey === 'unique_visitors') metrics.unique_visitors = m.count;
      if (m.metricKey === 'total_chats') metrics.total_chats = m.count;
    });

    // Fetch top 5 visitors by XP
    const topVisitors = await Visitor.find({})
      .sort({ xp: -1 })
      .limit(5)
      .select('nickname xp country -_id');

    return Response.json({
      metrics,
      topVisitors
    });
  } catch (error) {
    console.error("Analytics API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
