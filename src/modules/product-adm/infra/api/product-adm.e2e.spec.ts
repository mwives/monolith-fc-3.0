import { Sequelize } from 'sequelize-typescript'
import request from 'supertest'

import { ProductModel } from '@product-adm/repository/product.model'
import { app } from '@infra/api/express'
import { InputAddProductDto } from '@product-adm/usecase/add-product/add-product.dto'

describe('productAdmRouter E2E', () => {
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

  describe('POST /product', () => {
    const createProduct = async (data: InputAddProductDto) =>
      request(app).post('/product').send(data)

    it('should create a product and return 201', async () => {
      const input: InputAddProductDto = {
        name: 'any_name',
        description: 'any_description',
        purchasePrice: 10,
        stock: 10,
      }

      const response = await createProduct(input)

      expect(response.status).toBe(201)

      const createdProduct = await ProductModel.findOne({
        where: {
          name: 'any_name',
        },
      })

      expect(createdProduct).toBeTruthy()
    })
  })
})
