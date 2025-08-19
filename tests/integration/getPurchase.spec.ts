import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/index";
import { PurchaseModel } from "../../src/modules/purchase/purchase.model";

describe("Purchases API - GET routes", () => {
  let purchaseId: string;

  beforeAll(async () => {
    const mongoUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/test";
    await mongoose.connect(mongoUrl);
  });

  beforeEach(async () => {

    const purchase = await PurchaseModel.create({
      cart: [
        { productId: "1", name: "Notebook Gamer Pro", price: 7500, quantity: 1 },
        { productId: "2", name: "Mouse Sem Fio Ultra-leve", price: 350, quantity: 1 },
      ],
      total: 7850,
    });

    purchaseId = purchase._id.toString();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("deve retornar todas as compras", async () => {
    const response = await request(app).get("/api/purchases");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("_id", purchaseId);
  });

  it("deve retornar uma compra pelo ID", async () => {
    const response = await request(app).get(`/api/purchases/${purchaseId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", purchaseId);
    expect(response.body.cart.length).toBe(2);
    expect(response.body.total).toBe(7850);
  });

  it("deve retornar 404 se a compra não existir", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/purchases/${fakeId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Compra não encontrada.");
  });
});
