import request from "supertest";
import app from "../../src/index";

describe("Products API Integration (In-memory)", () => {

  it("deve retornar todos os produtos em memória", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    response.body.forEach((product: any) => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
    });

  });
});
