export type InputPlaceOrderDto = {
  clientId: string
  products: Array<{
    productId: string
  }>
}

export type OutputPlaceOrderDto = {
  id: string
  invoiceId: string
  status: string
  total: number
  products: Array<{
    productId: string
  }>
}
