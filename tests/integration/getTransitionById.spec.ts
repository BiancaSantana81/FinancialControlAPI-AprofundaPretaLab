import request from "supertest";
import app from "../../src/index";
import mongoose from "mongoose";

describe("Transações (MongoDB)", () => {
  let transactionId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL as string);
  });

  beforeEach(async () => {

    const transactionData = {
      date: "2025-01-02T00:00:00Z",
      description: "Transação de teste",
      amount: 100,
      type: "income",
      category: "Teste",
    };


    const response = await request(app)
      .post("/transactions")
      .send(transactionData);

    transactionId = response.body.id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("deve retornar uma transação pelo ID", async () => {
    const response = await request(app).get(`/transactions/${transactionId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("description", "Transação de teste");
    expect(response.body).toHaveProperty("amount", 100);
  });

  it("deve retornar 404 se a transação não existir", async () => {
    const response = await request(app).get(`/transactions/fake-id`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Transaction not found");
  });

  it("deve retornar todas as transações", async () => {
    const response = await request(app).get("/transactions");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("description", "Transação de teste");
  });
});
