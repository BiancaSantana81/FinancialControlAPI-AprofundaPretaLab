import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import mongoose from 'mongoose';
import { getAllTransactions, createTransaction } from '../../src/modules/transactions/transaction';

describe("getAllTransactions", () => {
  beforeAll(async () => {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) throw new Error("MONGODB_URL não definido");
    await mongoose.connect(mongoUrl);
  });

  beforeEach(async () => {

    await createTransaction({
      date: "2025-01-01T00:00:00Z",
      description: "Transação 1",
      amount: 100,
      type: "income",
      category: "Teste",
    });

    await createTransaction({
      date: "2025-01-02T00:00:00Z",
      description: "Transação 2",
      amount: 200,
      type: "expense",
      category: "Teste",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("deve retornar todas as transações", async () => {
    const result = await getAllTransactions();

    const descriptions = result.map(t => t.description);
    expect(descriptions).toContain("Transação 1");
    expect(descriptions).toContain("Transação 2");
  });
});
