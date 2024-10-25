import { Sequelize } from 'sequelize-typescript'

import { Invoice } from '@invoice/domain/entity/invoice'
import { InvoiceItem } from '@invoice/domain/entity/invoice-item'
import { Address } from '@invoice/domain/value-object/address'
import { Id } from '@shared/domain/value-object/id.value-object'
import { InvoiceItemModel } from './invoice-item.model'
import { InvoiceModel } from './invoice.model'
import { InvoiceRepository } from './invoice.repository'

describe('InvoiceRepository', () => {
  let sequelize: Sequelize
  const invoiceRepository = new InvoiceRepository()

  const invoice = new Invoice({
    id: new Id('any_id'),
    name: 'any_name',
    document: 'any_document',
    address: new Address({
      city: 'any_city',
      complement: 'any_complement',
      number: 'any_number',
      state: 'any_state',
      street: 'any_street',
      zipCode: 'any_zipCode',
    }),
    items: [
      new InvoiceItem({
        invoiceId: new Id('any_id'),
        name: 'any_name',
        price: 100,
      }),
    ],
  })

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

  describe('findById', () => {
    it('should find an invoice by id', async () => {
      const createdInvoice = await invoiceRepository.create(invoice)
      const foundInvoice = await invoiceRepository.findById(
        createdInvoice.id.value
      )

      expect(foundInvoice).toMatchObject({
        ...invoice,
        _createdAt: expect.any(Date),
        _updatedAt: expect.any(Date),
      })
    })
  })

  describe('create', () => {
    it('should create an invoice', async () => {
      const createdInvoice = await invoiceRepository.create(invoice)

      expect(createdInvoice.id.value).toBe(invoice.id.value)
      expect(createdInvoice).toMatchObject({
        ...invoice,
        _createdAt: expect.any(Date),
        _updatedAt: expect.any(Date),
      })
    })
  })
})
