import { PurchaseModel } from "./purchase.model";

export async function createPurchase(purchaseData: any) {
  const { cart, total } = purchaseData;

  if (!cart || !Array.isArray(cart)) throw new Error("Dados da compra inválidos.");

  if (total > 20000) throw new Error("O valor total da compra excede o limite de R$20.000.");

  const purchase = await PurchaseModel.create({
    cart,
    total,
  });

  return purchase.toObject();
}

export async function getAllPurchases() {
  return await PurchaseModel.find().sort({ date: -1 });
}

export async function getPurchaseById(id: string) {
  const purchase = await PurchaseModel.findById(id);
  if (!purchase) {
    throw new Error("Compra não encontrada.");
  }
  return purchase.toObject();
}
