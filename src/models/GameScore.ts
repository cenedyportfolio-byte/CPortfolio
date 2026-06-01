import mongoose, { Schema, Document } from "mongoose";

export interface IGameScore extends Document {
  visitorId: string;
  nickname: string;
  country: string;
  score: number;
  accuracy: number;
  enemiesDestroyed: number;
  playedAt: Date;
}

const GameScoreSchema: Schema = new Schema(
  {
    visitorId: { type: String, required: true },
    nickname: { type: String, required: true },
    country: { type: String, default: "Unknown" },
    score: { type: Number, required: true, index: -1 },
    accuracy: { type: Number, default: 0 },
    enemiesDestroyed: { type: Number, default: 0 },
    playedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const GameScore =
  mongoose.models.GameScore || mongoose.model<IGameScore>("GameScore", GameScoreSchema);
