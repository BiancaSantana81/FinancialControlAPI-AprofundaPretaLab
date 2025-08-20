import { Purchase } from "./purchase.entitie";
import { createPurchaseRepository } from "./purchase.repository.factory";

const repo = createPurchaseRepository();

export async function createPurchase(data: Omit<Purchase, "id">): Promise<Purchase> {
  // ✅ validações
  if (!data.cart || !Array.isArray(data.cart)) {
    throw new Error("Dados da compra inválidos.");
  }

  if (data.total > 20000) {
    throw new Error("O valor total da compra excede o limite de R$20.000.");
  }

  const purchase = new Purchase(
    "",
    data.cart,
    data.total,
    data.date || new Date()
  );

  return await repo.save(purchase);
}

export async function getAllPurchases(): Promise<Purchase[]> {
  const purchases = await repo.findAll();

  return purchases.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getPurchaseById(id: string): Promise<Purchase> {
  const purchase = await repo.findById(id);
  if (!purchase) throw new Error("Compra não encontrada.");
  return purchase;
}
