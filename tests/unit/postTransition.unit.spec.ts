import { Transaction, transactions } from '../../src/modules/transactions/transaction.mock'
import { createTransaction } from '../../src/modules/transactions/transaction';

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

});
