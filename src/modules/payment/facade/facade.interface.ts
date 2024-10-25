export type InputProcessPaymentFacadeDto = {
  orderId: string
  amount: number
}

export type OutputProcessPaymentFacadeDto = {
  transactionId: string
  orderId: string
  amount: number
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface PaymentFacadeInterface {
  process(
    input: InputProcessPaymentFacadeDto
  ): Promise<OutputProcessPaymentFacadeDto>
}
