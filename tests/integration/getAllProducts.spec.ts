import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/index";
import { ProductModel } from "../../src/modules/products/product.model";

describe("Products API Integration", () => {
  beforeAll(async () => {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) throw new Error("MONGODB_URL não definido");
    await mongoose.connect(mongoUrl);
  });

  beforeEach(async () => {

    await ProductModel.create([
      { name: "Notebook Gamer Pro", price: 7500 },
      { name: "Mouse Sem Fio Ultra-leve", price: 350 },
    ]);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("deve retornar todos os produtos", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    const productNames = response.body.map((p: any) => p.name);
    expect(productNames).toContain("Notebook Gamer Pro");
    expect(productNames).toContain("Mouse Sem Fio Ultra-leve");
  });

  it("cada produto deve ter id, name e price", async () => {
    const response = await request(app).get("/api/products");
    response.body.forEach((product: any) => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
    });
  });
});
