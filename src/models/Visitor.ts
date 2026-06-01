import mongoose, { Schema, Document } from "mongoose";

export interface IVisitor extends Document {
  visitorId: string;
  nickname: string;
  xp: number;
  country: string;
  visits: number;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VisitorSchema: Schema = new Schema(
  {
    visitorId: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
    xp: { type: Number, default: 0 },
    country: { type: String, default: "Unknown" },
    visits: { type: Number, default: 1 },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Visitor =
  mongoose.models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);
