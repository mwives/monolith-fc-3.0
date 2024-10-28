import { Sequelize } from 'sequelize-typescript'

import { InvoiceFacadeFactory } from '@invoice/factory/invoice.facade.factory'
import { InvoiceItemModel } from '@invoice/repository/invoice-item.model'
import { InvoiceModel } from '@invoice/repository/invoice.model'

describe('InvoiceFacade', () => {
  let sequelize: Sequelize
  const facade = InvoiceFacadeFactory.create()

  const input = {
    name: 'any_name',
    address: 'any_address',
    // document: 'any_document',
    // city: 'any_city',
    // complement: 'any_complement',
    // number: 'any_number',
    // state: 'any_state',
    // street: 'any_street',
    // zipCode: 'any_zipCode',
    items: [
      {
        id: 'any_id',
        name: 'any_name',
        price: 100,
      },
    ],
  }

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  describe('generateInvoice', () => {
    it('should generate an invoice', async () => {
      const invoice = await facade.generate(input)

      expect(invoice).toMatchObject({
        id: expect.any(String),
        name: input.name,
        address: input.address,
        // document: input.document,
        // street: input.street,
        // number: input.number,
        // complement: input.complement,
        // city: input.city,
        // state: input.state,
        // zipCode: input.zipCode,
        items: expect.arrayContaining([
          {
            id: expect.any(String),
            name: input.items[0].name,
            price: input.items[0].price,
          },
        ]),
      })
    })
  })

  describe('findInvoiceById', () => {
    it('should find an invoice by id', async () => {
      const createdInvoice = await facade.generate(input)

      const foundInvoice = await facade.findById({
        id: createdInvoice.id,
      })

      expect(foundInvoice).toMatchObject({
        id: expect.any(String),
        name: 'any_name',
        document: 'any_document',
        address: {
          city: 'any_city',
          complement: 'any_complement',
          number: 'any_number',
          state: 'any_state',
          street: 'any_street',
          zipCode: 'any_zipCode',
        },
        items: [
          {
            id: expect.any(String),
            name: 'any_name',
            price: 100,
          },
        ],
        total: 100,
        createdAt: expect.any(Date),
      })
    })
  })
})
