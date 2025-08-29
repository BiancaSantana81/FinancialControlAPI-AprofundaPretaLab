import request from "supertest";
import app from "../../src/index";
import { createPurchase } from "../../src/modules/purchase/purchase";
import mongoose from "mongoose";

describe("Purchases API - GET routes (MongoDB)", () => {
  let purchaseId: string;
  let purchaseData: any;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL as string);
  });

  beforeEach(async () => {
    purchaseData = {
      cart: [
        { productId: "1", name: "Notebook Gamer Pro", price: 7500, quantity: 1 },
        { productId: "2", name: "Mouse Sem Fio Ultra-leve", price: 350, quantity: 1 },
      ],
      total: 7850,
    };
    const purchase = await createPurchase(purchaseData);
    purchaseId = purchase.id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("deve retornar todas as compras", async () => {
    const response = await request(app).get("/purchases");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

  });

  it("deve retornar uma compra pelo ID", async () => {
    const response = await request(app).get(`/purchases/${purchaseId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", purchaseId);
    expect(response.body.cart.length).toBeGreaterThan(0);
  });

  it("deve retornar 404 se a compra não existir", async () => {
    const response = await request(app).get(`/purchases/fake-id`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Compra não encontrada.");
  });
});
