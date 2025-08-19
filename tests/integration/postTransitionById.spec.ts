import request from "supertest";
import app from "../../src/index";
import mongoose from "mongoose";

describe("POST /transactions", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL || "default");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("deve criar uma transação com sucesso e retornar status 201", async () => {
    const newTransaction = {
      date: "2025-01-02T00:00:00Z",
      description: "Nova transação",
      amount: 200,
      type: "expense",
      category: "Teste",
    };

    const response = await request(app)
      .post("/transactions")
      .send(newTransaction)

    expect(response.status).toBe(201);
    expect(response.body.category).toMatch(newTransaction.category);
  });

});

