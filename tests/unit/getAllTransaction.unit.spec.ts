import { createTransactionRepository } from '../../src/modules/transactions/transaction.repository.factory';
import { Transaction } from '../../src/modules/transactions/transaction.entitie';

describe("getAllTransactions (unit)", () => {
  let repo = createTransactionRepository();

  beforeEach(async () => {

    repo = createTransactionRepository();

    await repo.save(new Transaction("", 100, "Transação 1", "2025-01-01T00:00:00Z", "income", "Teste"));
    await repo.save(new Transaction("", 200, "Transação 2", "2025-01-02T00:00:00Z", "expense", "Teste"));
  });

  it("deve retornar todas as transações", async () => {
    const result = await repo.findAll();

    expect(result).toHaveLength(2);
    expect(result[0].description).toEqual("Transação 1");

  });
});
