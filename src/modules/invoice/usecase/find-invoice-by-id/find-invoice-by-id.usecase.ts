import { UseCaseInterface } from '@shared/usecase/usecase.interface'
import {
  InputFindInvoiceUseCaseDTO,
  OutputFindInvoiceUseCaseDTO,
} from './find-invoice-by-id.usecase.dto'
import { InvoiceGateway } from '@invoice/gateway/invoice.gateway'

export class FindInvoiceByIdUsecase implements UseCaseInterface {
  constructor(private readonly invoiceRepository: InvoiceGateway) {}

  async execute(
    input: InputFindInvoiceUseCaseDTO
  ): Promise<OutputFindInvoiceUseCaseDTO> {
    const invoice = await this.invoiceRepository.findById(input.id)

    return {
      id: invoice.id.value,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map((item) => ({
        id: item.id.value,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
      createdAt: invoice.createdAt,
    }
  }
}
