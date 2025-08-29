import mongoose, { Schema } from "mongoose";

const ChatHistorySchema = new Schema(
    {
        role: { type: String, required: true },
        parts: [
            { text: { type: String, required: true } }
        ],
    },
    {
        timestamps: true,
    }
);

export const ChatHistory = mongoose.model("ChatHistory", ChatHistorySchema);