import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/index";
import { ProductModel } from "../../src/modules/products/product.model";

describe("GET /api/products/:id", () => {
  let productId: string;

  beforeAll(async () => {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) throw new Error("MONGODB_URL não definido");
    await mongoose.connect(mongoUrl);
  });

  beforeEach(async () => {

    const product = await ProductModel.create({ name: "Teclado Mecânico RGB", price: 550 });
    productId = product._id.toString();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("deve retornar o produto pelo ID", async () => {
    const response = await request(app).get(`/api/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", productId);
    expect(response.body).toHaveProperty("name", "Teclado Mecânico RGB");
    expect(response.body).toHaveProperty("price", 550);
  });

  it("deve retornar 404 para ID inexistente", async () => {
    const fakeId = "64b3c0f1d2e4f00000000000"; // ID aleatório válido
    const response = await request(app).get(`/api/products/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Produto não encontrado.");
  });

  it("deve retornar 400 para ID inválido", async () => {
    const invalidId = "abc123";
    const response = await request(app).get(`/api/products/${invalidId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
