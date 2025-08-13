import { Request, Response } from "express";
import { GetAllTransactions } from "../../core/usecases/GetAllTransaction";
import { TransactionRepository } from "../../core/repositories/TransactionRepository";

export class GetAllTransactionsController {
  constructor(private readonly transactionRepo: TransactionRepository) {}

  async handle(_req: Request, res: Response): Promise<Response> {
    try {
      const getAllTransactions = new GetAllTransactions(this.transactionRepo);
      const transactions = await getAllTransactions.execute();

      return res.status(200).json(transactions);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || "Error fetching transactions" });
    }
  }
}
