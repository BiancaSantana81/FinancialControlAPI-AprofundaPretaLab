import { PurchaseRepository } from "./purchase.repository";
import { Purchase } from "./purchase.entitie";
import { PurchaseModel } from "./purchase.model";

export class MongoPurchaseRepository implements PurchaseRepository {
  private toEntity(doc: any): Purchase {
    return new Purchase(
      doc._id.toString(),
      doc.cart,
      doc.total,
      doc.date
    );
  }

  async save(purchase: Purchase): Promise<Purchase> {
    const doc = await PurchaseModel.create({
      cart: purchase.cart,
      total: purchase.total,
      date: purchase.date,
    });
    return this.toEntity(doc);
  }

  async findById(id: string): Promise<Purchase> {
    const doc = await PurchaseModel.findById(id).exec();
    if (!doc) throw new Error("Purchase not found");
    return this.toEntity(doc);
  }

  async findAll(): Promise<Purchase[]> {
    const docs = await PurchaseModel.find().sort({ date: -1 }).exec();
    return docs.map(this.toEntity);
  }
}
