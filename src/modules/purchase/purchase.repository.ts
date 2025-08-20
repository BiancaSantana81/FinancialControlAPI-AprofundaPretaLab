import { Purchase } from "./purchase.entitie";

export interface PurchaseRepository {
  save(purchase: Purchase): Promise<Purchase>;
  findById(id: string): Promise<Purchase>;
  findAll(): Promise<Purchase[]>;
}
