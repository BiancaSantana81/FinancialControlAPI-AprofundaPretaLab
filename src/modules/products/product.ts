import { InMemoryProductRepository } from "./product.repository.memory";

const productRepo = new InMemoryProductRepository();

export async function getAllProducts() {
  return await productRepo.findAll();
}

export async function getProductById(id: string) {
  return await productRepo.findById(id);
}
