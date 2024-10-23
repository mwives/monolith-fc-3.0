import { ProductGateway } from '@product-adm/gateway/product.gateway'
import {
  InputCheckStockDto,
  OutputCheckStockDto,
} from '@product-adm/usecase/check-stock/check-stock.dto'

export class CheckStockUseCase {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(input: InputCheckStockDto): Promise<OutputCheckStockDto> {
    const product = await this.productRepository.findById(input.productId)

    return {
      productId: product.id.value,
      stock: product.stock,
    }
  }
}
