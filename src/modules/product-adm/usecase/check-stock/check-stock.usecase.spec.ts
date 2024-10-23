import { Product } from '@product-adm/domain/product.entity'
import { CheckStockUseCase } from '@product-adm/usecase/check-stock/check-stock.usecase'
import { Id } from '@shared/domain/value-object/id.value-object'

describe('CheckStockUseCase', () => {
  const productRepository = {
    add: jest.fn(),
    findById: jest.fn(),
  }

  describe('execute', () => {
    it('should check stock', async () => {
      const productProps = {
        id: new Id('1'),
        name: 'any_name',
        description: 'any_description',
        purchasePrice: 100,
        stock: 10,
      }
      jest
        .spyOn(productRepository, 'findById')
        .mockResolvedValueOnce(new Product(productProps))

      const useCase = new CheckStockUseCase(productRepository)
      const stockResult = await useCase.execute({
        productId: productProps.id.value,
      })

      expect(productRepository.findById).toHaveBeenCalledTimes(1)
      expect(productRepository.findById).toHaveBeenCalledWith(
        productProps.id.value
      )
      expect(stockResult).toMatchObject({
        productId: productProps.id.value,
        stock: productProps.stock,
      })
    })
  })
})
