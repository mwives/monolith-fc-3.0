import { Sequelize } from 'sequelize-typescript'
import request from 'supertest'

import { app } from '@infra/api/express'
import { InvoiceModel } from '@invoice/repository/invoice.model'
import { InvoiceItemModel } from '@invoice/repository/invoice-item.model'

describe('invoiceRouter E2E', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()

    await InvoiceModel.create({
      id: 'any_id',
      name: 'any_name',
      document: 'any_document',
      street: 'any_street',
      number: 'any_number',
      complement: 'any_complement',
      city: 'any_city',
      state: 'any_state',
      zipCode: 'any_zipCode',
    })

    await InvoiceItemModel.create({
      id: 'any_invoice_item_id',
      invoiceId: 'any_id',
      name: 'any_name',
      price: 10,
    })
  })

  afterEach(async () => {
    await sequelize.close()
  })

  describe('GET /invoice/:id', () => {
    it('should return 200', async () => {
      const response = await request(app).get('/invoice/any_id')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        id: 'any_id',
        name: 'any_name',
        document: 'any_document',
        createdAt: expect.any(String),
        total: 10,
        address: {
          street: 'any_street',
          number: 'any_number',
          complement: 'any_complement',
          city: 'any_city',
          state: 'any_state',
          zipCode: 'any_zipCode',
        },
        items: [
          {
            id: 'any_invoice_item_id',
            name: 'any_name',
            price: 10,
          },
        ],
      })
    })
  })
})
