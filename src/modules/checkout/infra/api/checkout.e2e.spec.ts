import { Sequelize } from 'sequelize'
import { Sequelize as SequelizeTS } from 'sequelize-typescript'
import request from 'supertest'
import { Umzug } from 'umzug'

import { CheckoutModel } from '@checkout/repository/checkout/checkout.model'
import { ClientModel as CheckoutClientModel } from '@checkout/repository/client/client.model'
import { InputPlaceOrderDto } from '@checkout/usecase/place-order/place-order.usecase.dto'
import { ClientModel } from '@client-adm/repository/client.model'
import { app } from '@infra/api/express'
import { migrator } from '@infra/db/config/migrator'
import { InvoiceItemModel } from '@invoice/repository/invoice-item.model'
import { InvoiceModel } from '@invoice/repository/invoice.model'
import { TransactionModel } from '@payment/repository/transaction.model'
import { ProductModel as ProductAdmModel } from '@product-adm/repository/product.model'
import { ProductModel } from '@store-catalog/repository/product.model'

describe('checkout e2e', () => {
  let sequelize: SequelizeTS
  let migration: Umzug<Sequelize>

  beforeEach(async () => {
    sequelize = new SequelizeTS({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    })

    sequelize.addModels([
      CheckoutClientModel,
      CheckoutModel,
      ClientModel,
      InvoiceItemModel,
      InvoiceModel,
      ProductAdmModel,
      ProductModel,
      TransactionModel,
    ])

    migration = migrator(sequelize)
    await migration.up()

    await CheckoutModel.sync({ force: true })
    await ClientModel.sync({ force: true })
    await InvoiceItemModel.sync({ force: true })
    await InvoiceModel.sync({ force: true })
    await TransactionModel.sync({ force: true })

    try {
      await ClientModel.create({
        id: 'any_client_id',
        name: 'any_name',
        email: 'any_email',
        document: 'any_document',
        street: 'any_street',
        number: 'any_number',
        complement: 'any_complement',
        city: 'any_city',
        state: 'any_state',
        zipCode: 'any_zip_code',
      })

      const createdProduct = await ProductAdmModel.create({
        id: 'any_product_id',
        name: 'any_name',
        description: 'any_description',
        purchasePrice: 50,
        stock: 100,
      })

      await ProductModel.update(
        { salesPrice: 100 },
        { where: { id: createdProduct.id } }
      )
    } catch (err) {
      console.error(err)
    }
  })

  afterEach(async () => {
    await sequelize.close()
  })

  describe('POST /checkout', () => {
    const createOrder = async (data: InputPlaceOrderDto) =>
      request(app).post('/checkout').send(data)

    it('should create an order and return 201', async () => {
      const response = await createOrder({
        clientId: 'any_client_id',
        products: [
          {
            productId: 'any_product_id',
          },
        ],
      })

      expect(response.status).toBe(201)

      const createdOrder = await CheckoutModel.findOne({
        where: {
          clientId: 'any_client_id',
        },
      })

      expect(createdOrder).toBeTruthy()
    })
  })
})
