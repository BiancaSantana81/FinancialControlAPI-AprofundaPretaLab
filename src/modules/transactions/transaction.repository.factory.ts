import { TransactionRepository } from "./transaction.repository";
import { InMemoryTransactionRepository } from "./transaction.repository.memory";
import { MongoTransactionRepository } from "./transaction.repository.mongo";

export function createTransactionRepository(): TransactionRepository {
  // 👇 Regras de escolha
  if (process.env.NODE_ENV === "test") {
    // sempre em memória para testes unitários
    return new InMemoryTransactionRepository();
  }

  if (process.env.USE_MEMORY === "true") {
    // pode forçar memória em dev/local
    return new InMemoryTransactionRepository();
  }

  return new MongoTransactionRepository();
}
