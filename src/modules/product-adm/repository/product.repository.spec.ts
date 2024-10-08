import { Sequelize } from 'sequelize-typescript'

import { ProductModel } from '@product-adm/repository/product.model'
import { Product } from '@product-adm/domain/product.entity'
import { ProductRepository } from './product.repository'
import { Id } from '@shared/domain/value-object/id.value-object'

describe('ProductRepository', () => {
  let sequelize: Sequelize

  const productProps = {
    id: new Id('1'),
    name: 'any_name',
    description: 'any_description',
    purchasePrice: 100,
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
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

  describe('add', () => {
    it('should create a product', async () => {
      let { createdAt, updatedAt, ...props } = productProps
      const product = new Product(props)
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

  describe('findById', () => {
    it('should find a product by id', async () => {
      await ProductModel.create({ ...productProps, id: productProps.id.value })

      const productRepository = new ProductRepository()
      const productFound = await productRepository.findById(
        productProps.id.value
      )

      expect(productFound).toMatchObject({
        id: productProps.id,
        name: productProps.name,
        description: productProps.description,
        purchasePrice: productProps.purchasePrice,
        stock: productProps.stock,
      })
    })
  })
})
