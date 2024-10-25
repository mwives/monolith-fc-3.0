import { Id } from '@shared/domain/value-object/id.value-object'
import { FindInvoiceByIdUsecase } from './find-invoice-by-id.usecase'
import { Invoice } from '@invoice/domain/entity/invoice'
import { Address } from '@invoice/domain/value-object/address'
import { InvoiceItem } from '@invoice/domain/entity/invoice-item'

describe('FindInvoiceByIdUsecase', () => {
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
        name: 'any_name',
        price: 100,
      }),
    ],
  })

  const invoiceRepository = {
    findById: jest.fn(),
    create: jest.fn(),
  }
  const usecase = new FindInvoiceByIdUsecase(invoiceRepository)

  describe('execute', () => {
    it('should find an invoice by id', async () => {
      invoiceRepository.findById.mockResolvedValue(invoice)

      const foundInvoice = await usecase.execute({ id: '1' })

      expect(foundInvoice).toEqual({
        id: 'any_id',
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
        createdAt: invoice.createdAt,
      })
    })
  })
})
