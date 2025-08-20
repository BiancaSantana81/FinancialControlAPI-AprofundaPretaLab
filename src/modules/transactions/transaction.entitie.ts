// transaction.entitie.ts
export class Transaction {
  constructor(
    public id: string,
    public amount: number,
    public description: string,
    public date: string,
    public type: "income" | "expense",
    public category: string
  ) {}
}
