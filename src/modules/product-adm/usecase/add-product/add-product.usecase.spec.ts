import { InputAddProductDto } from '@product-adm/usecase/add-product/add-product.dto'
import { AddProductUseCase } from './add-product.usecase'

describe('AddProductUseCase', () => {
  const productRepository = {
    add: jest.fn(),
    findById: jest.fn(),
  }

  describe('execute', () => {
    it('should add a product', async () => {
      const useCase = new AddProductUseCase(productRepository)

      const input: InputAddProductDto = {
        name: 'any_name',
        description: 'any_description',
        purchasePrice: 100,
        stock: 10,
      }

      const result = await useCase.execute(input)

      expect(productRepository.add).toHaveBeenCalledTimes(1)
      expect(result.id).toBeDefined()
      expect(result).toMatchObject({
        name: input.name,
        description: input.description,
        purchasePrice: input.purchasePrice,
        stock: input.stock,
      })
    })
  })
})
