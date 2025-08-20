import request from "supertest";
import app from "../../src/index";

describe("Products API Integration ", () => {

  it("deve retornar todos os produtos da API products", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([
      { "id": "1", "name": "Notebook Gamer Pro", "price": 7500 },
      { "id": "2", "name": "Mouse Sem Fio Ultra-leve", "price": 350 },
      { "id": "3", "name": "Teclado Mecânico RGB", "price": 550 },
      { "id": "4", "name": "Monitor 4K 27\"", "price": 2500 },
      { "id": "5", "name": "Headset 7.1 Surround", "price": 600 },
      { "id": "6", "name": "Webcam Full HD", "price": 400 },
      { "id": "7", "name": "SSD NVMe 1TB", "price": 800 }])
  });
});
