import { getTransitionById } from '../../src/index'

describe("getTransitionById", () => {
  it("deve retornar uma transação pelo id", async () => {
    const id = "1";
    const result = await getTransitionById(id);

    expect(result).toEqual({
      id: "1",
      amount: 5000,
      description: "Salário de Julho",
      category: "Salário",
      date: "2024-07-15T10:00:00Z",
      type: "income",
    });

  });
});
