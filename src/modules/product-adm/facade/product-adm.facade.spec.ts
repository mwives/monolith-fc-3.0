import { Sequelize } from 'sequelize-typescript'

import { ProductAdmFacadeFactory } from '@product-adm/factory/facade.factory'
import { ProductModel } from '@product-adm/repository/product.model'
import { InputAddProductFacadeDto } from './product-adm.facade.interface'

describe('ProductAdmFacade', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  describe('addProduct', () => {
    const input: InputAddProductFacadeDto = {
      id: '1',
      name: 'any_name',
      description: 'any_description',
      purchasePrice: 100,
      stock: 10,
    }

    it('should add a product', async () => {
      const productFacade = ProductAdmFacadeFactory.create()

      await productFacade.addProduct(input)

      const productCreated = await ProductModel.findByPk(input.id)

      expect(productCreated).toMatchObject({
        id: input.id,
        name: input.name,
        description: input.description,
        purchasePrice: input.purchasePrice,
        stock: input.stock,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })
  })
})
