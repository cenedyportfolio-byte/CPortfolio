import connectToDatabase from '@/lib/mongodb';
import { GameScore } from '@/models/GameScore';

export const revalidate = 0; // Dynamic route

// In-memory fallback leaderboard when MongoDB is offline
let fallbackScores = [
  { nickname: "StarBuck", country: "Canada", score: 1250 },
  { nickname: "NovaViper", country: "United Kingdom", score: 980 },
  { nickname: "ApexStar", country: "Singapore", score: 750 }
];

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch top 3 scores
    const topScores = await GameScore.find({})
      .sort({ score: -1 })
      .limit(3)
      .select('nickname country score -_id');

    // Aggregate stats
    const totalGames = await GameScore.countDocuments();
    const topScoreRecord = await GameScore.findOne({}).sort({ score: -1 }).select('score');

    return Response.json({
      topScores,
      stats: {
        totalGames,
        topScore: topScoreRecord ? topScoreRecord.score : 0,
      }
    });
  } catch (error) {
    console.warn("MongoDB offline, serving in-memory fallback leaderboard:", error);
    
    // Sort and slice top 3
    const sorted = [...fallbackScores].sort((a, b) => b.score - a.score);
    const topScores = sorted.slice(0, 3);
    const totalGames = sorted.length;
    const topScore = sorted.length > 0 ? sorted[0].score : 0;

    return Response.json({
      topScores,
      stats: {
        totalGames,
        topScore
      }
    });
  }
}

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response("Bad Request: Invalid JSON", { status: 400 });
  }

  const { visitorId, nickname, country, score, accuracy, enemiesDestroyed } = body;

  if (!visitorId || !nickname || typeof score !== 'number') {
    return new Response("Bad Request: Missing required fields", { status: 400 });
  }

  try {
    await connectToDatabase();
    
    const newScore = new GameScore({
      visitorId,
      nickname,
      country: country || 'Unknown',
      score,
      accuracy: accuracy || 0,
      enemiesDestroyed: enemiesDestroyed || 0,
    });

    await newScore.save();

    return Response.json({ success: true, message: 'Score submitted successfully' });
  } catch (error) {
    console.warn("MongoDB offline, saving score to in-memory fallback:", error);
    
    // Add to in-memory fallback list
    fallbackScores.push({
      nickname,
      country: country || 'Unknown',
      score
    });

    return Response.json({ success: true, message: 'Score submitted successfully (Offline mode)' });
  }
}

