import { getProducts } from "../../src/shared/services/products";
import nock from "nock";

describe("Products API", () => {
    it("deve retornar a lista de produtos", async () => {
        nock("https://pretalab-api-439254010866.us-central1.run.app")
            .get("/products")
            .reply(200, [{
                id: 1, name: "Notebook Gamer Pro"
            }]);

        const products = await getProducts();

        expect(products).toEqual([
            { id: 1, name: "Notebook Gamer Pro" }
        ]);
    });
});