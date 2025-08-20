import { ProductModel } from "./product.model";

export interface Product {
  id?: string;
  name: string;
  price: number;
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await ProductModel.find();
  return products.map(p => ({
    id: p._id.toString(),
    name: p.name,
    price: p.price,
  }));
}

export async function getProductById(id: string): Promise<Product> {
  const product = await ProductModel.findById(id);
  if (!product) throw new Error("Produto não encontrado.");
  return {
    id: product._id.toString(),
    name: product.name,
    price: product.price,
  };
}
