import { Sequelize } from 'sequelize-typescript'

import { ProductModel } from '@store-catalog/repository/product.model'
import { StoreCatalogFacadeFactory } from '@store-catalog/factory/facade.factory'

describe('ProductRepository', () => {
  let sequelize: Sequelize
  const facade = StoreCatalogFacadeFactory.create()

  const productProps = {
    id: 'any_id',
    name: 'any_name',
    description: 'any_description',
    salesPrice: 100,
  }

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

  describe('findAll', () => {
    it('should return all products', async () => {
      await ProductModel.create({ ...productProps })

      const result = await facade.findAll()

      expect(result.products).toHaveLength(1)
      expect(result.products[0]).toMatchObject({
        id: expect.any(String),
        ...productProps,
      })
    })
  })

  describe('findById', () => {
    it('should return a product by id', async () => {
      const product = await ProductModel.create({ ...productProps })

      const result = await facade.findById({ id: product.id })

      expect(result).toMatchObject({
        id: expect.any(String),
        ...productProps,
      })
    })
  })
})
