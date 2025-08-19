import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/index";
import { ProductModel } from "../../src/modules/products/product.model";

describe("GET /api/products - allProducts", () => {
    beforeAll(async () => {
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) throw new Error("MONGODB_URL não definido");
        await mongoose.connect(mongoUrl);
    });

    beforeEach(async () => {
        await ProductModel.create([
            { name: "Notebook Gamer Pro", price: 7500 },
            { name: "Teclado Mecânico RGB", price: 550 },
        ]);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it("deve retornar todos os produtos cadastrados", async () => {
        const response = await request(app).get("/api/products");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        const productNames = response.body.map((p: any) => p.name);
        expect(productNames).toContain("Notebook Gamer Pro");
        expect(productNames).toContain("Mouse Sem Fio Ultra-leve");
        expect(productNames).toContain("Teclado Mecânico RGB");

        response.body.forEach((product: any) => {
            expect(product).toHaveProperty("id");
            expect(product).toHaveProperty("name");
            expect(product).toHaveProperty("price");
        });
    });
});
