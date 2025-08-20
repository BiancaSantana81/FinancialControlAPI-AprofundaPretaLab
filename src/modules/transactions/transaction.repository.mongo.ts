import { Transaction } from "./transaction.entitie";
import { TransactionRepository } from "./transaction.repository";
import { TransactionModel } from "./transaction.model";

export class MongoTransactionRepository implements TransactionRepository {
  private toEntity(doc: any): Transaction {
    return new Transaction(
      doc._id.toString(),
      doc.amount,
      doc.description,
      doc.date,
      doc.type,
      doc.category
    );
  }

  async save(transaction: Transaction): Promise<Transaction> {
    const doc = await TransactionModel.create({
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
      type: transaction.type,
      category: transaction.category
    });
    return this.toEntity(doc);
  }

  async findById(id: string): Promise<Transaction> {
    const doc = await TransactionModel.findById(id).exec();
    if (!doc) throw new Error("Transaction not found");
    return this.toEntity(doc);
  }

  async findAll(): Promise<Transaction[]> {
    const docs = await TransactionModel.find();
    return docs.map((doc) => this.toEntity(doc));
  }

}
