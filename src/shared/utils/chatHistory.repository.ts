import { ChatHistory } from "./chatHistory.model";

export interface IChatPart {
  text: string;
}

export interface IChatMessage {
  _id?: string;
  role: string;
  parts: IChatPart[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class ChatRepository {

  async createMessage(role: string, text: string): Promise<IChatMessage> {
    const message = await ChatHistory.create({
      role,
      parts: [{ text }],
    });
    return {
      _id: message._id.toString(),
      role: message.role,
      parts: message.parts.map((p) => ({ text: p.text })),
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    };
  }

  async getAllMessages(order: "asc" | "desc" = "asc"): Promise<IChatMessage[]> {
    const messages = await ChatHistory.find().sort({ createdAt: order === "asc" ? 1 : -1 });
    return messages.map((msg) => ({
      _id: msg._id.toString(),
      role: msg.role,
      parts: msg.parts.map((p) => ({ text: p.text })),
      createdAt: msg.createdAt,
      updatedAt: msg.updatedAt,
    }));
  }
}
