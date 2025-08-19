import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/index";

describe("Transações (com database)", () => {
  let newTransaction: any;
  let transactionResponse: any;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL || "default");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {

    newTransaction = {
      date: "2025-01-02T00:00:00Z",
      description: "Transação 1",
      amount: 100,
      type: "income",
      category: "Teste",
    };

    const response = await request(app)
      .post("/transactions")
      .send(newTransaction);

    transactionResponse = response.body;
  });

  describe("GET /transactions", () => {
    it("deve retornar todas as transações do database", async () => {
      const response = await request(app).get("/transactions");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("description", "Transação 1");
      expect(response.body[0]).toHaveProperty("amount", 100);
    });
  });
});
