import { Invoice } from '@invoice/domain/entity/invoice'
import { InvoiceGateway } from '@invoice/gateway/invoice.gateway'
import { InvoiceModel } from './invoice.model'
import { InvoiceItemModel } from './invoice-item.model'
import { Address } from '@invoice/domain/value-object/address'
import { Id } from '@shared/domain/value-object/id.value-object'
import { InvoiceItem } from '@invoice/domain/entity/invoice-item'

export class InvoiceRepository implements InvoiceGateway {
  async findById(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findByPk(id, {
      include: InvoiceItemModel,
    })

    if (!invoice) {
      return null
    }

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode,
      }),
      items: invoice.InvoiceItems.map(
        (item) =>
          new InvoiceItem({
            id: new Id(item.id),
            invoiceId: new Id(item.invoiceId),
            name: item.name,
            price: item.price,
          })
      ),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    })
  }

  async create(invoice: Invoice): Promise<Invoice> {
    const transaction = await InvoiceModel.sequelize.transaction()

    try {
      const invoiceData = {
        id: invoice.id.value,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      }

      const createdInvoice = await InvoiceModel.create(invoiceData, {
        transaction,
      })

      const invoiceItems = invoice.items.map((item) => ({
        id: item.id.value,
        invoiceId: invoice.id.value,
        name: item.name,
        price: item.price,
      }))

      await InvoiceItemModel.bulkCreate(invoiceItems, { transaction })

      await transaction.commit()

      return new Invoice({
        id: new Id(createdInvoice.id),
        name: createdInvoice.name,
        document: createdInvoice.document,
        address: new Address({
          street: createdInvoice.street,
          number: createdInvoice.number,
          complement: createdInvoice.complement,
          city: createdInvoice.city,
          state: createdInvoice.state,
          zipCode: createdInvoice.zipCode,
        }),
        items: invoiceItems.map(
          (item) =>
            new InvoiceItem({
              id: new Id(item.id),
              invoiceId: new Id(item.invoiceId),
              name: item.name,
              price: item.price,
            })
        ),
        createdAt: createdInvoice.createdAt,
        updatedAt: createdInvoice.updatedAt,
      })
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
