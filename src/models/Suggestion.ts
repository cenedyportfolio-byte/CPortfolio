import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Anonymous",
      trim: true,
      maxlength: 100,
    },
    message: {
      type: String,
      required: [true, "Suggestion message is required."],
      trim: true,
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

const Suggestion =
  mongoose.models.Suggestion || mongoose.model("Suggestion", SuggestionSchema);

export default Suggestion;
