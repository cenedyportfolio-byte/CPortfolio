"use server";

import connectToDatabase from "@/lib/mongodb";
import Suggestion from "@/models/Suggestion";
import { revalidatePath } from "next/cache";

export async function submitSuggestion(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

    if (!message || message.trim() === "") {
      return {
        success: false,
        error: "Message is required.",
      };
    }

    await connectToDatabase();

    await Suggestion.create({
      name: name?.trim() || "Anonymous",
      message: message.trim(),
    });

    // Optional: revalidate a path if you have an admin dashboard
    // revalidatePath('/admin/suggestions');

    return {
      success: true,
      message: "Suggestion submitted successfully!",
    };
  } catch (error: any) {
    console.error("Failed to submit suggestion:", error);
    return {
      success: false,
      error: "An error occurred while submitting your suggestion.",
    };
  }
}
