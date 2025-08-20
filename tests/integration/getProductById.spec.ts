import request from "supertest";
import app from "../../src/index";

describe("GET /api/products/:id (In-memory)", () => {
  let productId: number;

  beforeAll(() => {
    productId = 3;
  });

  it("deve retornar o produto pelo ID", async () => {
    const response = await request(app).get(`/api/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", productId);
    expect(response.body).toHaveProperty("name", "Teclado Mecânico RGB");
    expect(response.body).toHaveProperty("price", 550);
  });

  it("deve retornar 404 para ID inexistente", async () => {
    const fakeId = 999;
    const response = await request(app).get(`/api/products/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Produto não encontrado");
  });

});
