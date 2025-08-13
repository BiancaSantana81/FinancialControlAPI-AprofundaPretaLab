export class Transaction {
  constructor(
    public id: string,
    public date: string,
    public description: string,
    public amount: number,
    public type: "income" | "expense",
    public category: string
  ) {}
}
