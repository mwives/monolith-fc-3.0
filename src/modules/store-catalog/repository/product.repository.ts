import { Id } from '@shared/domain/value-object/id.value-object'
import { Product } from '@store-catalog/domain/product.entity'
import { ProductGateway } from '@store-catalog/gateway/product.gateway'
import { ProductModel } from '@store-catalog/repository/product.model'

export class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll()
    return products.map(({ dataValues: product }) => {
      return new Product({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })
    })
  }

  async findById(id: string): Promise<Product> {
    const product = await ProductModel.findOne({
      where: { id },
    })
    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    })
  }
}
