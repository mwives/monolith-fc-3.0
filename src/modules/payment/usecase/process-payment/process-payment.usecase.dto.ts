export type InputProcessPaymentDto = {
  orderId: string
  amount: number
}

export type OutputProcessPaymentDto = {
  transactionId: string
  orderId: string
  amount: number
  status: string
  createdAt: Date
  updatedAt: Date
}
