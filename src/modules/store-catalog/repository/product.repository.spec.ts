import { Sequelize } from 'sequelize-typescript'

import { ProductModel } from '@store-catalog/repository/product.model'
import { ProductRepository } from '@store-catalog/repository/product.repository'
import { Id } from '@shared/domain/value-object/id.value-object'

describe('ProductRepository', () => {
  let sequelize: Sequelize

  const productProps = {
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
      await ProductModel.create({ ...productProps, id: new Id().value })
      await ProductModel.create({ ...productProps, id: new Id().value })

      const productRepository = new ProductRepository()

      const products = await productRepository.findAll()

      expect(products).toHaveLength(2)
      expect(products[0]).toMatchObject({
        id: expect.any(Id),
        ...productProps,
      })
      expect(products[1]).toMatchObject({
        id: expect.any(Id),
        ...productProps,
      })
    })
  })

  describe('findById', () => {
    it('should return a product by id', async () => {
      const product = await ProductModel.create({
        ...productProps,
        id: new Id().value,
      })

      const productRepository = new ProductRepository()

      const productFound = await productRepository.findById(product.id)

      expect(productFound).not.toBeNull()
      expect(productFound).toMatchObject({
        id: expect.any(Id),
        ...productProps,
      })
    })
  })
})
