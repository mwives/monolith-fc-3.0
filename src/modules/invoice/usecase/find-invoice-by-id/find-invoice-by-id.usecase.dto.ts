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
