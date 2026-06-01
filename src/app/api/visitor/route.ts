import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import connectToDatabase from '@/lib/mongodb';
import { Visitor } from '@/models/Visitor';
import { Analytics } from '@/models/Analytics';

export async function POST(req: Request) {
  try {
    const { visitorId, action } = await req.json();

    if (!visitorId) {
      return new Response("Missing visitorId", { status: 400 });
    }

    await connectToDatabase();

    // Check if visitor exists
    let visitor = await Visitor.findOne({ visitorId });

    if (!visitor) {
      // It's a new visitor. Let's try to get their IP and Country
      const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
      let country = "Unknown";

      if (ip && ip !== "unknown" && ip !== "127.0.0.1" && ip !== "::1") {
        try {
          const geoRes = await fetch(`https://ipapi.co/${ip.split(',')[0].trim()}/json/`);
          const geoData = await geoRes.json();
          if (geoData.country_name) {
            country = geoData.country_name;
          }
        } catch (e) {
          console.error("IP Geo Lookup failed", e);
        }
      } else {
         country = "Local Dev";
      }

      // Generate a cool nickname
      let nickname = "Mysterious Wanderer";
      try {
        const result = await generateText({
          model: google('gemini-1.5-flash'),
          prompt: "Generate a cool, 2-word cyberpunk or hacker-style anonymous nickname for a website visitor. Return ONLY the nickname, nothing else. Example: Neon Ghost",
        });
        nickname = result.text.trim().replace(/['"]/g, '');
      } catch (e) {
        console.error("Failed to generate nickname", e);
      }

      // Create visitor
      visitor = new Visitor({
        visitorId,
        nickname,
        country,
        xp: 10, // starting xp
      });

      await visitor.save();

      // Increment global unique visitors
      await Analytics.findOneAndUpdate(
        { metricKey: 'unique_visitors' },
        { $inc: { count: 1 } },
        { upsert: true }
      );
    } else {
      // Existing visitor, maybe they are doing an action that grants XP
      if (action === 'grant_xp') {
        visitor.xp += 5;
      }
      
      // Update visits and lastActive
      if (action === 'page_load') {
          visitor.visits += 1;
      }

      visitor.lastActive = new Date();
      await visitor.save();
    }

    // Always increment page views on page_load action
    if (action === 'page_load') {
        await Analytics.findOneAndUpdate(
            { metricKey: 'page_views' },
            { $inc: { count: 1 } },
            { upsert: true }
        );
    }

    return Response.json({
      nickname: visitor.nickname,
      xp: visitor.xp,
      country: visitor.country,
      visits: visitor.visits
    });
  } catch (error) {
    console.error("Visitor API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
