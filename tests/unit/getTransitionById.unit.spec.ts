import request from "supertest";
import mongoose from 'mongoose';
import app from "../../src/index";
import { getTransactionById } from '../../src/modules/transactions/transaction';

describe("getTransactionById", () => {
  let transactionId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL || "default");
  });

  beforeEach(async () => {
    const newTransaction = {
      date: "2025-01-02T00:00:00Z",
      description: "Nova transação",
      amount: 200,
      type: "expense",
      category: "Teste",
    };

    const response = await request(app)
      .post("/api/transactions")
      .send(newTransaction);

    transactionId = response.body._id;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("deve retornar uma transação pelo id", async () => {
    const result = await getTransactionById(transactionId);

    expect(result).toHaveProperty("description", "Nova transação");
  });
});
