// FindInvoiceById
export type InputFindInvoiceUseCaseDTO = {
  id: string
}

export type OutputFindInvoiceUseCaseDTO = {
  id: string
  name: string
  document: string
  address: {
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
  }
  items: Array<{
    id: string
    name: string
    price: number
  }>
  total: number
  createdAt: Date
}

// GenerateInvoice
export type InputGenerateInvoiceUseCaseDto = {
  name: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
  items: Array<{
    id: string
    name: string
    price: number
  }>
}

export type OutputGenerateInvoiceUseCaseDto = {
  id: string
  name: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
  items: Array<{
    id: string
    name: string
    price: number
  }>
  total: number
}

export interface InvoiceFacadeInterface {
  findById(
    input: InputFindInvoiceUseCaseDTO
  ): Promise<OutputFindInvoiceUseCaseDTO>
  generate(
    input: InputGenerateInvoiceUseCaseDto
  ): Promise<OutputGenerateInvoiceUseCaseDto>
}
