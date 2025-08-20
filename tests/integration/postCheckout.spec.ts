import request from "supertest";
import app from "../../src/index";

process.env.NODE_ENV = "test";

describe("POST /api/checkout (em memória)", () => {

  it("deve processar uma compra válida com sucesso", async () => {
    const purchaseData = {
      cart: [
        { productId: 1, quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
        { productId: 2, quantity: 2, name: "Mouse Sem Fio Ultra-leve", price: 350 },
      ],
      total: 7500 + 350 * 2,
    };

    const response = await request(app)
      .post("/api/checkout")
      .send(purchaseData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Compra processada com sucesso!");
  });

  it("deve retornar erro se o total exceder R$20.000", async () => {
    const purchaseData = {
      cart: [{ productId: 1, quantity: 3, name: "Notebook Gamer Pro", price: 7500 }],
      total: 22500,
    };

    const response = await request(app)
      .post("/api/checkout")
      .send(purchaseData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "O valor total da compra excede o limite de R$20.000.");
  });

  it("deve retornar erro se os dados forem inválidos", async () => {
    const purchaseData = { total: 500 };

    const response = await request(app)
      .post("/api/checkout")
      .send(purchaseData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Dados da compra inválidos.");
  });
});
