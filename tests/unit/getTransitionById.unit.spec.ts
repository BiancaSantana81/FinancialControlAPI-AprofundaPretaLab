import request from "supertest";
import mongoose from 'mongoose';
import app from "../../src/index";
import { getTransactionById } from '../../src/modules/transactions/transaction';

describe("getTransitionById", () => {

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
      .post("/transactions")
      .send(newTransaction)

  });

  it("deve retornar uma transação pelo id", async () => {
    const id = "1";
    const result = await getTransactionById(id);

    expect(result).toEqual({
      id: "1",
      amount: 5000,
      description: "Salário de Julho",
      category: "Salário",
      date: "2024-07-15T10:00:00Z",
      type: "income",
    });

  });
});
