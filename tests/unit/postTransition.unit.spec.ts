import { createTransactionRepository } from '../../src/modules/transactions/transaction.repository.factory';
import { Transaction } from '../../src/modules/transactions/transaction.entitie';

describe("createTransaction (unit)", () => {
  let repo = createTransactionRepository();

  it("deve criar uma nova transação com sucesso", async () => {
    const transactionData = new Transaction(
      "",
      100,
      "Teste criação",
      "2025-01-01T00:00:00Z",
      "income",
      "Teste"
    );

    const result = await repo.save(transactionData);

    expect(result.category).toBe(transactionData.category);
    expect(result.amount).toBe(transactionData.amount);
    expect(result.description).toBe(transactionData.description);
  });
});
