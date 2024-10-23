import { StoreCatalogFacade } from '@store-catalog/facade/store-catalog.facade'
import { ProductRepository } from '@store-catalog/repository/product.repository'
import { FindAllProductsUseCase } from '@store-catalog/usecase/find-all-products/find-all-products.usecase'
import { FindProductByIdUseCase } from '@store-catalog/usecase/find-product-by-id/find-product-by-id.usecase'

export class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository()

    const findAllUseCase = new FindAllProductsUseCase(productRepository)
    const findByIdUseCase = new FindProductByIdUseCase(productRepository)

    return new StoreCatalogFacade({
      findAllUseCase,
      findByIdUseCase,
    })
  }
}
