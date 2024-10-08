import { Product } from '@product-adm/domain/product.entity'
import { ProductGateway } from '@product-adm/gateway/product.gateway'
import { ProductModel } from './product.model'

export class ProductRepository implements ProductGateway {
  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.value,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  async findById(id: string): Promise<Product> {
    throw new Error('Method not implemented.')
  }
}
