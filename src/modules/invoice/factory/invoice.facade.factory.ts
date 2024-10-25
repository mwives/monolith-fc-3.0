import { InvoiceFacade } from '@invoice/facade/invoice.facade'
import { InvoiceRepository } from '@invoice/repository/invoice.repository'
import { FindInvoiceByIdUsecase } from '@invoice/usecase/find-invoice-by-id/find-invoice-by-id.usecase'
import { GenerateInvoiceUsecase } from '@invoice/usecase/generate-invoice/generate-invoice.usecase'

export class InvoiceFacadeFactory {
  static create() {
    const invoiceRepository = new InvoiceRepository()
    return new InvoiceFacade(
      new GenerateInvoiceUsecase(invoiceRepository),
      new FindInvoiceByIdUsecase(invoiceRepository)
    )
  }
}
