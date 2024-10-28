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
