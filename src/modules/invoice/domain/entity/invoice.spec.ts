import { Id } from '@shared/domain/value-object/id.value-object'
import { Invoice } from './invoice'
import { InvoiceItem } from './invoice-item'
import { Address } from '../value-object/address'

describe('Invoice', () => {
  const invoice = new Invoice({
    name: 'any_name',
    document: 'any_document',
    address: new Address({
      street: 'any_street',
      number: 'any_number',
      complement: 'any_complement',
      city: 'any_city',
      state: 'any_state',
      zipCode: 'any_zip_code',
    }),
    items: [
      new InvoiceItem({
        name: 'any_name',
        price: 10,
      }),
      new InvoiceItem({
        name: 'any_name',
        price: 20,
      }),
    ],
  })

  describe('calculateTotal', () => {
    it('should return the total of the invoice', () => {
      expect(invoice.total).toBe(30)
    })
  })
})
