import request from "supertest";
import app from "../../src/index";
import { createTransaction } from "../../src/modules/transactions/transaction";

// força uso do repositório em memória
process.env.NODE_ENV = "test";

describe("Transações (em memória)", () => {
  let transactionId: string;

  beforeEach(async () => {

    const transactionData = {
      date: "2025-01-02T00:00:00Z",
      description: "Transação de teste",
      amount: 100,
      type: "income",
      category: "Teste",
    };


    const response = await request(app)
      .post("/api/transactions")
      .send(transactionData);

    transactionId = response.body.id;
  });

  it("deve retornar uma transação pelo ID", async () => {
    const response = await request(app).get(`/api/transactions/${transactionId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("description", "Transação de teste");
    expect(response.body).toHaveProperty("amount", 100);
  });

  it("deve retornar 404 se a transação não existir", async () => {
    const response = await request(app).get(`/api/transactions/fake-id`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Transaction not found");
  });

  it("deve retornar todas as transações", async () => {
    const response = await request(app).get("/api/transactions");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("description", "Transação de teste");
  });
});
