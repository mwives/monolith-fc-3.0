import { UseCaseInterface } from '@shared/usecase/usecase.interface'
import { ProductGateway } from '@store-catalog/gateway/product.gateway'

export class FindAllProductsUseCase implements UseCaseInterface {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute() {
    const productsResult = await this.productRepository.findAll()
    const products = productsResult.map((product) => ({
      id: product.id.value,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }))

    return { products }
  }
}
