import { Invoice } from '@invoice/domain/entity/invoice'

export interface InvoiceGateway {
  findById(id: string): Promise<Invoice>
  create(invoice: Invoice): Promise<Invoice>
}
