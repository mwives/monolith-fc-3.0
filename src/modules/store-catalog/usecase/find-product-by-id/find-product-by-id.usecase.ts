import { UseCaseInterface } from '@shared/usecase/usecase.interface'
import { ProductGateway } from '@store-catalog/gateway/product.gateway'
import {
  InputFindProductByIdDto,
  OutputFindProductByIdDto,
} from '@store-catalog/usecase/find-product-by-id/find-product-by-id.dto'

export class FindProductByIdUseCase implements UseCaseInterface {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute({
    id,
  }: InputFindProductByIdDto): Promise<OutputFindProductByIdDto> {
    const product = await this.productRepository.findById(id)
    if (!product) return null
    return {
      id: product.id.value,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }
  }
}
