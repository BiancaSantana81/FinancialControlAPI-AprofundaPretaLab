import { Transaction } from '../entities/Transaction';

export interface TransactionRepository {
    //save(transaction: Transaction): Promise<Transaction>;
    //findById(id: string): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    //deleteById(id: string): Promise<void>;
    //updateTransaction(transaction: Transaction): Promise<Transaction>;
}