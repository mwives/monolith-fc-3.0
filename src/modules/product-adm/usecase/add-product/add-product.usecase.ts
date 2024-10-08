import { Product } from '@product-adm/domain/product.entity'
import { ProductGateway } from '@product-adm/gateway/product.gateway'
import {
  InputAddProductDto,
  OutputAddProductDto,
} from '@product-adm/usecase/add-product/add-product.dto'
import { Id } from '@shared/domain/value-object/id.value-object'

export class AddProductUseCase {
  constructor(private readonly _productRepository: ProductGateway) {}

  async execute(input: InputAddProductDto): Promise<OutputAddProductDto> {
    const product = new Product({
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    })

    this._productRepository.add(product)

    return {
      id: product.id.value,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}
