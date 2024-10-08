import { Product } from '@product-adm/domain/product.entity'

export interface ProductGateway {
  add(product: Product): Promise<void>
  findById(id: string): Promise<Product>
}
