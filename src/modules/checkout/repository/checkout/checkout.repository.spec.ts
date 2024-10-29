import { Sequelize } from 'sequelize-typescript'

import { Client } from '@checkout/domain/entity/client.entity'
import { Order } from '@checkout/domain/entity/order.entity'
import { Product } from '@checkout/domain/entity/product.entity'
import { Address } from '@checkout/domain/value-object/address'
import { ClientModel } from '@checkout/repository/client/client.model'
import { Id } from '@shared/domain/value-object/id.value-object'
import { CheckoutModel } from './checkout.model'
import { CheckoutRepository } from './checkout.repository'

describe('CheckoutRepository', () => {
  let sequelize: Sequelize
  const checkoutRepository = new CheckoutRepository()

  const clientProps = {
    id: 'any_id',
    name: 'any_name',
    document: 'any_document',
    email: 'any_email',
    street: 'any_street',
    number: 'any_number',
    complement: 'any_complement',
    city: 'any_city',
    state: 'any_state',
    zipCode: 'any_zipCode',
  }

  const order = new Order({
    id: new Id('any_id'),
    products: [
      new Product({
        id: new Id('any_id'),
        name: 'any_name',
        description: 'any_description',
        salesPrice: 10,
      }),
    ],
    client: new Client({
      id: new Id(clientProps.id),
      name: clientProps.name,
      document: clientProps.document,
      address: new Address({
        street: clientProps.street,
        number: clientProps.number,
        complement: clientProps.complement,
        city: clientProps.city,
        state: clientProps.state,
        zipCode: clientProps.zipCode,
      }),
    }),
  })

  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date('2000-01-11'))
  })

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CheckoutModel, ClientModel])
    await sequelize.sync()

    await ClientModel.create(clientProps)
  })

  afterEach(async () => {
    await sequelize.close()
  })

  describe('createOrder', () => {
    it('should create an order', async () => {
      await checkoutRepository.createOrder(order)
      const createdOrder = await CheckoutModel.findByPk(order.id.value)

      expect(createdOrder).toMatchObject({
        id: order.id.value,
        clientId: order.client.id.value,
        status: order.status,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })
  })

  describe('findOrderById', () => {
    it('should find an order by id', async () => {
      await checkoutRepository.createOrder(order)
      const foundOrder = await checkoutRepository.findOrderById(order.id.value)

      expect(foundOrder.id.value).toBe(order.id.value)
      expect(foundOrder.client.id.value).toBe(order.client.id.value)
      expect(foundOrder.client).toMatchObject(new Client(order.client))

      expect(foundOrder.status).toBe(order.status)
    })

    it('should return null if order is not found', async () => {
      const foundOrder = await checkoutRepository.findOrderById('invalid_id')

      expect(foundOrder).toBeNull()
    })
  })
})
