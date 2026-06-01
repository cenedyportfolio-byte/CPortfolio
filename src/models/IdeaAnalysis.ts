import mongoose, { Schema, Document } from "mongoose";

export interface IIdeaAnalysis extends Document {
  visitorId: string;
  idea: string;
  architecture: string;
  techStack: string[];
  complexity: string;
  createdAt: Date;
}

const IdeaAnalysisSchema: Schema = new Schema(
  {
    visitorId: { type: String, required: true },
    idea: { type: String, required: true },
    architecture: { type: String, required: true },
    techStack: { type: [String], required: true },
    complexity: { type: String, required: true },
  },
  { timestamps: true }
);

export const IdeaAnalysis =
  mongoose.models.IdeaAnalysis ||
  mongoose.model<IIdeaAnalysis>("IdeaAnalysis", IdeaAnalysisSchema);
