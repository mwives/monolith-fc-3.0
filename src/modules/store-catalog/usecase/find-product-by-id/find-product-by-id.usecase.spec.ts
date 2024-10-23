import { Id } from '@shared/domain/value-object/id.value-object'
import { Product } from '@store-catalog/domain/product.entity'
import { FindProductByIdUseCase } from './find-product-by-id.usecase'

describe('FindProductByIdUsecase', () => {
  const product = new Product({
    id: new Id(),
    name: 'any_name',
    description: 'any_description',
    salesPrice: 100,
  })

  const productRepository = {
    findAll: jest.fn(),
    findById: jest.fn().mockResolvedValue(product),
  }

  describe('execute', () => {
    it('should return a product by id', async () => {
      const useCase = new FindProductByIdUseCase(productRepository)

      const result = await useCase.execute({ id: product.id.value })

      expect(productRepository.findById).toHaveBeenCalledTimes(1)
      expect(productRepository.findById).toHaveBeenCalledWith(product.id.value)
      expect(result).toMatchObject({
        id: product.id.value,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })
    })

    it('should return null if product not found', async () => {
      productRepository.findById.mockResolvedValueOnce(null)

      const useCase = new FindProductByIdUseCase(productRepository)

      const result = await useCase.execute({ id: product.id.value })

      expect(productRepository.findById).toHaveBeenCalledTimes(1)
      expect(productRepository.findById).toHaveBeenCalledWith(product.id.value)
      expect(result).toBeNull()
    })
  })
})
