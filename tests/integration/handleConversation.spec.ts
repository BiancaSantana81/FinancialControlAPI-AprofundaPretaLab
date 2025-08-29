import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/index";
import { ChatHistory } from "../../src/shared/utils/chatHistory.model";
import { financialAssitant } from "../../src/shared/adapters/gemini";
import { geminiInteral } from "../../src/shared/utils/gemini";


import dotenv from "dotenv";
dotenv.config({ path: ".env" });

// Mock do Gemini
jest.mock("../../src/shared/adapters/gemini", () => ({
    __esModule: true,
    financialAssitant: jest.fn(),
}));

jest.mock("../../src/shared/utils/gemini", () => ({
    __esModule: true,
    geminiInteral: jest.fn(),
}));

describe("POST /ai - Integration", () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URL as string);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it("deve retornar resposta do modelo e salvar no banco", async () => {
        (financialAssitant as jest.Mock).mockResolvedValue({ fake: "data" });
        (geminiInteral as jest.Mock).mockResolvedValue({ response: "Olá! Aqui estão seus dados." });

        const res = await request(app)
            .post("/ai")
            .send({ prompt: "Oi, pronta pra me ajudar?" })
            .expect(200);

        expect(res.body).toHaveProperty("chatHistory");
    });
});
