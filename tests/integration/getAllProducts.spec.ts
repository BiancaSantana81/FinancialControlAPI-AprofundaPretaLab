import request from "supertest";
import app from "../../src/index";
import nock from "nock";

describe("Products API Integration ", () => {
  it("deve retornar todos os produtos da API products", async () => {
    nock("https://pretalab-api-439254010866.us-central1.run.app")
      .get("/products")
      .reply(200, {
        data: [
          { id: "1", name: "Notebook Gamer Pro", price: 7500 },
          { id: "2", name: "Mouse Sem Fio Ultra-leve", price: 350 }
        ]
      });

    const response = await request(app)
      .get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      data: [
        { id: "1", name: "Notebook Gamer Pro", price: 7500 },
        { id: "2", name: "Mouse Sem Fio Ultra-leve", price: 350 },
      ],
    });
  });
});
