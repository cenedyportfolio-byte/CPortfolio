import mongoose, { Schema, Document } from "mongoose";

export interface IAiChat extends Document {
  visitorId: string;
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
  createdAt: Date;
}

const AiChatSchema: Schema = new Schema(
  {
    visitorId: { type: String, required: true },
    messages: [
      {
        role: { type: String, enum: ["user", "assistant", "system"], required: true },
        content: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const AiChat =
  mongoose.models.AiChat || mongoose.model<IAiChat>("AiChat", AiChatSchema);
