import { Transaction } from "../../core/entities/Transaction";
import { TransactionRepository } from "../../core/repositories/TransactionRepository";

export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Transaction[] = [
    new Transaction("1", "2024-07-15T10:00:00Z", "Salário de Julho", 5000, "income", "Salário"),
    new Transaction("2", "2024-07-15T12:30:00Z", "Aluguel", 1500, "expense", "Moradia"),
    new Transaction("3", "2024-07-16T09:00:00Z", "Compras no Supermercado", 350.75, "expense", "Alimentação"),
    new Transaction("4", "2024-07-17T18:00:00Z", "Venda de item usado", 120, "income", "Renda Extra"),
    new Transaction("5", "2024-07-18T20:00:00Z", "Jantar fora", 85.5, "expense", "Lazer"),
    new Transaction("6", "2024-07-20T11:00:00Z", "Conta de Internet", 99.9, "expense", "Contas"),
    new Transaction("7", "2024-07-22T14:00:00Z", "Reembolso de despesa", 50, "income", "Outros"),
    new Transaction("8", "2024-07-25T08:00:00Z", "Gasolina", 180, "expense", "Transporte"),
    new Transaction("9", "2024-08-01T10:00:00Z", "Pagamento Freelance", 800, "income", "Renda Extra"),
    new Transaction("10", "2024-08-02T15:00:00Z", "Ingressos para show", 250, "expense", "Lazer"),
  ];

  async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }
}
