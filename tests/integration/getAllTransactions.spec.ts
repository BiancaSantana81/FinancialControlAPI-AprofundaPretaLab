import request from "supertest";
import app from "../../src/index";
import mongoose from "mongoose";

describe("Transações (MongoDB)", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL as string);
  });

  beforeEach(async () => {

    let newTransaction: any;

    newTransaction = {
      date: "2025-01-02T00:00:00Z",
      description: "Transação 1",
      amount: 100,
      type: "income",
      category: "Teste",
    };

    await request(app).post("/transactions").send(newTransaction);
    await request(app).post("/transactions").send(newTransaction);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("GET /transactions", () => {
    it("deve retornar todas as transações registradas no banco", async () => {
      const response = await request(app).get("/transactions");

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
