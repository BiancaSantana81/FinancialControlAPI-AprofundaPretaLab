import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import mongoose from 'mongoose';
import { createTransaction } from '../../src/modules/transactions/transaction';

describe("createTransaction", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL || "default");
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("deve criar uma nova transação com sucesso", async () => {
    const transactionData = {
      date: "2025-01-01T00:00:00Z",
      description: "Teste criação",
      amount: 100,
      type: "income",
      category: "Teste",
    };

    const result = await createTransaction(transactionData);

    expect(result.category).toMatch(transactionData.category);
  });
});
