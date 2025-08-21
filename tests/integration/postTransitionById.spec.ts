import request from "supertest";
import app from "../../src/index";

process.env.NODE_ENV = "test";

describe("POST /transactions (em memória)", () => {

  it("deve criar uma transação com sucesso e retornar status 200", async () => {
    const newTransaction = {
      date: "2025-01-02T00:00:00Z",
      description: "Nova transação",
      amount: 200,
      type: "expense",
      category: "Teste",
    };

    const response = await request(app)
      .post("/transactions")
      .send(newTransaction);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("description", "Nova transação");

  });
});
