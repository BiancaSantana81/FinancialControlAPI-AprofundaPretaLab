import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/index";
import { ProductModel } from "../../src/modules/products/product.model";

describe("Products API Integration", () => {

  it("deve retornar todos os produtos", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(Array);

  });

});
