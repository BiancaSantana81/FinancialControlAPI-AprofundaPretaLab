import { Transaction } from "../entities/Transaction";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class GetAllTransactions {
  constructor(private readonly transactionRepo: TransactionRepository) {}

  async execute(): Promise<Transaction[]> {
    return this.transactionRepo.findAll();
  }
}
