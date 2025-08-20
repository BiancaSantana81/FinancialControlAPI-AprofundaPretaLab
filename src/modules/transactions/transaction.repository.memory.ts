import { randomUUID } from "crypto";
import { Transaction } from "./transaction.entitie";
import { TransactionRepository } from "./transaction.repository";

export class InMemoryTransactionRepository implements TransactionRepository {
  public transactions: Transaction[] = [];

  async save(transaction: Transaction): Promise<Transaction> {
    if (!transaction.id) {
      transaction.id = randomUUID();
    }
    this.transactions.push(transaction);
    return transaction;
  }

  async findById(id: string): Promise<Transaction> {
    const transaction = this.transactions.find((t) => t.id === id);
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }
}
