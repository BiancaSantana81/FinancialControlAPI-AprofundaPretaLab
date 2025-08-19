import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/index";
import { ProductModel } from "../../src/modules/products/product.model";
import { PurchaseModel } from "../../src/modules/purchase/purchase.model"

describe("POST /api/checkout", () => {
  let productA: any;
  let productB: any;

  beforeAll(async () => {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) throw new Error("MONGODB_URL não definido");
    await mongoose.connect(mongoUrl);
  });

  beforeEach(async () => {
    productA = await ProductModel.create({ name: "Notebook Gamer Pro", price: 7500 });
    productB = await ProductModel.create({ name: "Mouse Sem Fio Ultra-leve", price: 350 });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("deve processar uma compra válida com sucesso", async () => {
    const purchaseData = {
      cart: [
        { productId: productA._id.toString(), quantity: 1, name: productA.name, price: productA.price },
        { productId: productB._id.toString(), quantity: 2, name: productB.name, price: productB.price },
      ],
      total: productA.price * 1 + productB.price * 2,
    };

    const response = await request(app)
      .post("/api/checkout")
      .send(purchaseData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Compra processada com sucesso!");
  });

  it("deve retornar erro se o total exceder R$20.000", async () => {
    const expensiveProduct = await ProductModel.create({ name: "PC Gamer Ultra", price: 21000 });
    const purchaseData = {
      cart: [{ productId: expensiveProduct._id.toString(), quantity: 1, name: expensiveProduct.name, price: expensiveProduct.price }],
      total: 21000,
    };

    const response = await request(app)
      .post("/api/checkout")
      .send(purchaseData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "O valor total da compra excede o limite de R$20.000.");
  });

  it("deve retornar erro se os dados forem inválidos", async () => {
    const invalidData = { total: 500 };

    const response = await request(app)
      .post("/api/checkout")
      .send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Dados da compra inválidos.");
  });
});
