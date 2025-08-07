import request from "supertest";
import app from "../../src/index";

describe("GET /:id - transação por ID", () => {
  it("deve retornar a transação existente", async () => {
    const res = await request(app).get("/1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", "1");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("amount");
  });

  it("deve retornar 404 se a transação não existir", async () => {
    const res = await request(app).get("/999");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Transaction not found");
  });
});
