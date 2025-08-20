import { getProductById } from "../../src/modules/products/product";
import { Product } from "../../src/modules/products/product.entitie";

describe("Products Unit Tests (in memory)", () => {
    it("getProductById deve retornar produto correto pelo ID", async () => {
        // Na memória, o ID do "Mouse Sem Fio Ultra-leve" é 2
        const found: Product = await getProductById("2");

        expect(found).toHaveProperty("id", 2);
        expect(found).toHaveProperty("name", "Mouse Sem Fio Ultra-leve");
        expect(found).toHaveProperty("price", 350);
    });

    it("getProductById deve lançar erro se produto não existir", async () => {
        await expect(getProductById("999")).rejects.toThrow("Produto não encontrado");
    });
});
