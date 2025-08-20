import { Transaction } from "./transaction.entitie";

export interface TransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
  findById(id: string): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
}
