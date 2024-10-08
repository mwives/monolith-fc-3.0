import { Sequelize } from 'sequelize-typescript'

import { ProductModel } from '@product-adm/repository/product.model'
import { Product } from '@product-adm/domain/product.entity'
import { ProductRepository } from './product.repository'
import { Id } from '@shared/domain/value-object/id.value-object'

describe('ProductRepository', () => {
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

  describe('add', () => {
    it('should create a product', async () => {
      const productProps = {
        id: new Id('1'),
        name: 'any_name',
        description: 'any_description',
        purchasePrice: 100,
        stock: 10,
      }

      const product = new Product(productProps)
      const productRepository = new ProductRepository()

      await productRepository.add(product)

      const productCreated = await (
        await ProductModel.findByPk(productProps.id.value)
      ).dataValues

      expect(productCreated).toMatchObject({
        id: productProps.id.value,
        name: productProps.name,
        description: productProps.description,
        purchasePrice: productProps.purchasePrice,
        stock: productProps.stock,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })
  })
})
