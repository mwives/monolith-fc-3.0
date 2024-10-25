import { Transaction } from '@payment/domain/transaction'
import { TransactionGateway } from '@payment/gateway/transaction.gateway'
import { UseCaseInterface } from '@shared/usecase/usecase.interface'
import {
  InputProcessPaymentDto,
  OutputProcessPaymentDto,
} from './process-payment.usecase.dto'

export class ProcessPaymentUsecase implements UseCaseInterface {
  constructor(private transactionRepository: TransactionGateway) {}

  async execute(
    input: InputProcessPaymentDto
  ): Promise<OutputProcessPaymentDto> {
    const transaction = new Transaction({
      orderId: input.orderId,
      amount: input.amount,
    })

    transaction.process()

    const persistTransaction = await this.transactionRepository.save(
      transaction
    )

    return {
      transactionId: persistTransaction.id.value,
      orderId: persistTransaction.orderId,
      amount: persistTransaction.amount,
      status: persistTransaction.status,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt,
    }
  }
}
