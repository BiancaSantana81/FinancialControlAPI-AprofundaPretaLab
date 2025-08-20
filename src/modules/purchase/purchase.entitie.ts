export interface PurchaseItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export class Purchase {
  constructor(
    public id: string,
    public cart: PurchaseItem[],
    public total: number,
    public date: Date
  ) {}
}
