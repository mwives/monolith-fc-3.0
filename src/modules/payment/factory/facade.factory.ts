import { PaymentFacadeInterface } from '@payment/facade/facade.interface'
import { PaymentFacade } from '@payment/facade/payment.facade'
import { TransactionRepository } from '@payment/repository/transaction.repository'
import { ProcessPaymentUsecase } from '@payment/usecase/process-payment/process-payment.usecase'

export class PaymentFacadeFactory {
  static create(): PaymentFacadeInterface {
    const transactionRepository = new TransactionRepository()

    const processPaymentUsecase = new ProcessPaymentUsecase(
      transactionRepository
    )

    return new PaymentFacade(processPaymentUsecase)
  }
}
