import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import mongoose from "mongoose";
import { ProductModel } from "../../src/modules/products/product.model";
import { getProductById } from "../../src/modules/products/product";

describe("Products Unit Tests", () => {
    beforeAll(async () => {
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) throw new Error("MONGODB_URL não definido");
        await mongoose.connect(mongoUrl);
    });

    beforeEach(async () => {
        await ProductModel.create({ name: "Mouse Sem Fio Ultra-leve", price: 350 });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it("getProductById deve retornar produto correto pelo ID", async () => {
        const product = await ProductModel.findOne({ name: "Mouse Sem Fio Ultra-leve" });
        const found = await getProductById(product!._id.toString());
        expect(found).toHaveProperty("name", "Mouse Sem Fio Ultra-leve");
    });

    it("getProductById deve lançar erro se produto não existir", async () => {
        const fakeId = "64b3c0f1d2e4f00000000000";
        await expect(getProductById(fakeId)).rejects.toThrow("Produto não encontrado.");
    });
});
