import { PurchaseRepository } from "./purchase.repository";
import { Purchase, PurchaseItem } from "./purchase.entitie";
import { randomUUID } from "crypto";

export class InMemoryPurchaseRepository implements PurchaseRepository {
  private purchases: Purchase[] = [];

  async save(purchase: Purchase): Promise<Purchase> {
    if (!purchase.id) purchase.id = randomUUID();
    this.purchases.push(purchase);
    return purchase;
  }

  async findById(id: string): Promise<Purchase> {
    const purchase = this.purchases.find(p => p.id === id);
    if (!purchase) throw new Error("Purchase not found");
    return purchase;
  }

  async findAll(): Promise<Purchase[]> {
    return [...this.purchases].sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
