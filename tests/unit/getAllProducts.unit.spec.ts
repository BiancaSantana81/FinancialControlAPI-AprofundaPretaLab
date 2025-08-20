import { getAllProducts } from "../../src/modules/products/product";
import { Product } from "../../src/modules/products/product.entitie";

describe("GET /api/products - allProducts (in memory)", () => {
  it("deve retornar todos os produtos pré-carregados em memória", async () => {
    const products: Product[] = await getAllProducts();

    expect(products.length).toBeGreaterThan(0);

    const namesToCheck = [
      "Notebook Gamer Pro",
      "Mouse Sem Fio Ultra-leve",
      "Teclado Mecânico RGB",
    ];

    namesToCheck.forEach((name) => {
      const found = products.find((p) => p.name === name);
      expect(found).toBeDefined();
    });

  });
});
