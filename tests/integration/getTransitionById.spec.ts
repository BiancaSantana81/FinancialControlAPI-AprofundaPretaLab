import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/index";

describe("Transações (com database)", () => {

  let newTransaction: any;
  let transactionResponse: any;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL || "default");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    newTransaction = {
      date: "2025-01-02T00:00:00Z",
      description: "Transação de teste",
      amount: 100,
      type: "income",
      category: "Teste",
    };

    const response = await request(app)
      .post("/api/transactions")
      .send(newTransaction);

    transactionResponse = response.body;

  });


  describe("GET /transactions", () => {

    it("deve retornar uma transação do database", async () => {
      const response = await request(app).get(`/api/transactions/${transactionResponse._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("description", "Transação de teste");
    });
  });

    it("deve retornar 404 se a transação não existir", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app).get(`/api/transactions/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Transaction not found");
    });
});
