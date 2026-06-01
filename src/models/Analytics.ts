import mongoose, { Schema, Document } from "mongoose";

export interface IAnalytics extends Document {
  metricKey: string;
  count: number;
}

const AnalyticsSchema: Schema = new Schema(
  {
    metricKey: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Analytics =
  mongoose.models.Analytics || mongoose.model<IAnalytics>("Analytics", AnalyticsSchema);
