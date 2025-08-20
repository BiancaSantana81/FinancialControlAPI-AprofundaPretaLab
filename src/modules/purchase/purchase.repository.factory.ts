import { PurchaseRepository } from "./purchase.repository";
import { InMemoryPurchaseRepository } from "./purchase.repository.memory";
import { MongoPurchaseRepository } from "./purchase.repository.mongo";

export function createPurchaseRepository(): PurchaseRepository {
  if (process.env.NODE_ENV === "test") {
    return new InMemoryPurchaseRepository();
  }
  if (process.env.USE_MEMORY === "true") {
    return new InMemoryPurchaseRepository();
  }
  return new MongoPurchaseRepository();
}
