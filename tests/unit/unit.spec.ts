import request from "supertest";
import app, { getMessage } from "../../src/index";

describe("getMessage function", () => {
  it("deve retornar a mensagem corretamente", () => {
    const result = getMessage();

    expect(result).toEqual({ message: "Hello, unit test!" });
  });
});