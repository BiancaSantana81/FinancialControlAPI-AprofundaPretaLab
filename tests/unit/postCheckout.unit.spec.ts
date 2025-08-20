import { createPurchase } from "../../src/modules/purchase/purchase";
import { Purchase } from "../../src/modules/purchase/purchase.entitie";

describe("createPurchase", () => {
  it("deve criar uma nova compra com sucesso", async () => {
    const purchaseData: Omit<Purchase, "id"> = {
      cart: [
        { productId: "1", name: "Notebook Gamer Pro", price: 7500, quantity: 1 },
        { productId: "2", name: "Mouse Sem Fio Ultra-leve", price: 350, quantity: 2 },
      ],
      total: 8200,
      date: new Date(),
    };

    const result = await createPurchase(purchaseData);

    expect(result.cart.length).toBe(2);
    expect(result.total).toBe(8200);

    expect(result.cart[0]).toMatchObject({ productId: "1", quantity: 1 });
    expect(result.cart[1]).toMatchObject({ productId: "2", quantity: 2 });
  });

  it("deve lançar erro se total > 20000", async () => {
    const purchaseData: Omit<Purchase, "id"> = {
      cart: [
        { productId: "1", name: "Notebook Gamer Pro", price: 7500, quantity: 3 },
      ],
      total: 22500,
      date: new Date(),
    };

    await expect(createPurchase(purchaseData)).rejects.toThrow(
      "O valor total da compra excede o limite de R$20.000."
    );
  });

  it("deve lançar erro se dados forem inválidos", async () => {
    const purchaseData = { total: 1000 } as any;
    await expect(createPurchase(purchaseData)).rejects.toThrow(
      "Dados da compra inválidos."
    );
  });
});
