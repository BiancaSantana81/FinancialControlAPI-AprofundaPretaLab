import request from "supertest";
import app from "../../src/index";

describe("Transações (In-memory)", () => {
  let newTransaction: any;
  let transactionResponse: any;

  beforeEach(async () => {

    newTransaction = {
      date: "2025-01-02T00:00:00Z",
      description: "Transação 1",
      amount: 100,
      type: "income",
      category: "Teste",
    };

    const response = await request(app)
      .post("/transactions")
      .send(newTransaction);

    transactionResponse = response.body;
  });

  describe("GET /transactions", () => {
    it("deve retornar todas as transações em memória", async () => {
      const response = await request(app).get("/transactions");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);

    });
  });
});
