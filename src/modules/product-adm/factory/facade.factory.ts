import { ProductAdmFacade } from '@product-adm/facade/product-adm.facade'
import { ProductRepository } from '@product-adm/repository/product.repository'
import { AddProductUseCase } from '@product-adm/usecase/add-product/add-product.usecase'

export class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository()

    const addProductUseCase = new AddProductUseCase(productRepository)
    const checkStockUseCase: any = null

    return new ProductAdmFacade({
      addProductUseCase,
      checkStockUseCase,
    })
  }
}
