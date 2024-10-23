import { Id } from '@shared/domain/value-object/id.value-object'
import { Product } from '@store-catalog/domain/product.entity'
import { FindAllProductsUseCase } from './find-all-products.usecase'

describe('FindAllProductsUseCase', () => {
  const productRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
  }

  describe('execute', () => {
    const product1 = new Product({
      id: new Id(),
      name: 'any_name',
      description: 'any_description',
      salesPrice: 100,
    })
    const product2 = new Product({
      id: new Id(),
      name: 'any_name2',
      description: 'any_description2',
      salesPrice: 200,
    })

    it('should return all products', async () => {
      const useCase = new FindAllProductsUseCase(productRepository)

      productRepository.findAll.mockResolvedValueOnce([product1, product2])

      const result = await useCase.execute()

      expect(productRepository.findAll).toHaveBeenCalledTimes(1)
      expect(result.products).toHaveLength(2)
      expect(result.products[0]).toMatchObject({
        id: product1.id.value,
        name: product1.name,
        description: product1.description,
        salesPrice: product1.salesPrice,
      })
      expect(result.products[1]).toMatchObject({
        id: product2.id.value,
        name: product2.name,
        description: product2.description,
        salesPrice: product2.salesPrice,
      })
    })
  })
})
