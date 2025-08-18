import request from "supertest";
import app from "../../src/index";
import { Transaction, transactions } from '../../src/modules/transactions/transaction.mock'

describe("POST /transactions", () => {

  it("deve criar uma transação com sucesso e retornar status 201", async () => {
    const newTransaction = {
      id: "200",
      date: "2025-01-02T00:00:00Z",
      description: "Nova transação",
      amount: 200,
      type: "expense",
      category: "Teste",
    };

    const response = await request(app)
      .post("/transactions")
      .send(newTransaction)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newTransaction);
    expect(transactions).toContainEqual(newTransaction);
  });

  it("deve retornar erro 400 se id já existir", async () => {
    const transaction: Transaction = {
      id: "201",
      date: "2025-01-02T00:00:00Z",
      description: "Existente",
      amount: 150,
      type: "income",
      category: "Teste",
    };
    transactions.push(transaction);

    const response = await request(app)
      .post("/transactions")
      .send(transaction)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Transaction with this ID already exists");
  });
});

