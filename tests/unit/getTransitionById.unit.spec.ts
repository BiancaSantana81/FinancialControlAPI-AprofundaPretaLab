import { createTransactionRepository } from '../../src/modules/transactions/transaction.repository.factory';
import { Transaction } from '../../src/modules/transactions/transaction.entitie';

describe("getTransactionById (unit)", () => {
  let repo = createTransactionRepository();
  let transactionId: string;

  beforeEach(async () => {
    const newTransaction = new Transaction(
      "",
      200,
      "Nova transação",
      "2025-01-02T00:00:00Z",
      "expense",
      "Teste"
    );

    const created = await repo.save(newTransaction);
    transactionId = created.id;
  });

  it("deve retornar uma transação pelo id", async () => {
    const result = await repo.findById(transactionId);

    expect(result).toHaveProperty("description", "Nova transação");
    expect(result.amount).toBe(200);
    expect(result.type).toBe("expense");
    expect(result.category).toBe("Teste");
  });
});
