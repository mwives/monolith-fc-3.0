import { Product } from '@store-catalog/domain/product.entity'

export interface ProductGateway {
  findAll(): Promise<Product[]>
  findById(id: string): Promise<Product>
}
