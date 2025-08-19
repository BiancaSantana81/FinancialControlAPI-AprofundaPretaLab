import { ProductModel } from "./product.model";

export interface Product {
  id?: string;
  name: string;
  price: number;
}

// Lista todos os produtos
export async function getAllProducts(): Promise<Product[]> {
  const products = await ProductModel.find();
  return products.map(p => ({
    id: p._id.toString(),
    name: p.name,
    price: p.price,
  }));
}

// Cria um novo produto
export async function createProduct(product: Product): Promise<Product> {
  const created = await ProductModel.create(product);
  return {
    id: created._id.toString(),
    name: created.name,
    price: created.price,
  };
}

// Busca produto por ID
export async function getProductById(id: string): Promise<Product> {
  const product = await ProductModel.findById(id);
  if (!product) throw new Error("Produto não encontrado.");
  return {
    id: product._id.toString(),
    name: product.name,
    price: product.price,
  };
}
