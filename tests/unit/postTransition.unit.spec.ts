import { Transaction, transactions } from '../../src/data';
import { createTransaction } from '../../src/index';

describe("createTransaction", () => {

  it("deve criar uma nova transação com sucesso", async () => {
    const transaction: Transaction = {
      id: "100",
      date: "2025-01-01T00:00:00Z",
      description: "Teste criação",
      amount: 100,
      type: "income",
      category: "Teste",
    };

    const result = await createTransaction(transaction);
    expect(result).toEqual(transaction);
    expect(transactions).toContainEqual(transaction);
  });

  it("deve lançar erro se o id já existir", async () => {
    const transaction: Transaction = {
      id: "1",
      date: "2025-01-01T00:00:00Z",
      description: "Teste criação",
      amount: 100,
      type: "income",
      category: "Teste",
    };
    transactions.push(transaction);

    await expect(createTransaction(transaction)).rejects.toThrow("Transaction with this ID already exists");
  });
});
