import { Invoice } from '@invoice/domain/entity/invoice'
import { InvoiceItem } from '@invoice/domain/entity/invoice-item'
import { Address } from '@invoice/domain/value-object/address'
import { InvoiceGateway } from '@invoice/gateway/invoice.gateway'
import { Id } from '@shared/domain/value-object/id.value-object'
import { UseCaseInterface } from '@shared/usecase/usecase.interface'
import {
  InputGenerateInvoiceUseCaseDto,
  OutputGenerateInvoiceUseCaseDto,
} from './generate-invoice.usecase.dto'

export class GenerateInvoiceUsecase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: InputGenerateInvoiceUseCaseDto
  ): Promise<OutputGenerateInvoiceUseCaseDto> {
    const address = new Address({
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
    })
    const items = input.items.map(
      (item) =>
        new InvoiceItem({
          invoiceId: new Id(),
          name: item.name,
          price: item.price,
        })
    )
    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address,
      items,
    })

    await this.invoiceRepository.create(invoice)

    return {
      id: invoice.id.value,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.value,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
    }
  }
}
