import { Transaction, transactions } from "./transaction.mock";
import { TransactionModel } from "./transaction.model";

export async function getTransactionById(id: string) {
  const transaction = await TransactionModel.findById(id).exec();
  if (!transaction) throw new Error("Transaction not found");
  return transaction.toObject();
}

export async function createTransaction(transaction: any) {
  const created = await TransactionModel.create(transaction);
  return created.toObject();
}

export async function getAllTransactions(): Promise<Transaction[]> {
  return await TransactionModel.find();
}
