import { Product } from "./product.entitie";

export class InMemoryProductRepository {
  private products: Product[] = [
    { id: 1, name: "Notebook Gamer Pro", price: 7500 },
    { id: 2, name: "Mouse Sem Fio Ultra-leve", price: 350 },
    { id: 3, name: "Teclado Mecânico RGB", price: 550 },
    { id: 4, name: "Monitor 4K 27\"", price: 2500 },
    { id: 5, name: "Headset 7.1 Surround", price: 600 },
    { id: 6, name: "Webcam Full HD", price: 400 },
    { id: 7, name: "SSD NVMe 1TB", price: 800 },
  ].map(p => new Product(p.id, p.name, p.price));

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: string | number): Promise<Product> {
    const productId = typeof id === "string" ? parseInt(id) : id;
    const product = this.products.find(p => p.id === productId);
    if (!product) throw new Error("Produto não encontrado");
    return product;
  }
}
