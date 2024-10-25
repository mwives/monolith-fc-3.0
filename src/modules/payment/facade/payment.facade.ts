import { ProcessPaymentUsecase } from '@payment/usecase/process-payment/process-payment.usecase'
import {
  InputProcessPaymentFacadeDto,
  OutputProcessPaymentFacadeDto,
  PaymentFacadeInterface,
} from './facade.interface'

export class PaymentFacade implements PaymentFacadeInterface {
  constructor(private readonly processPaymentUsecase: ProcessPaymentUsecase) {}

  async process(
    input: InputProcessPaymentFacadeDto
  ): Promise<OutputProcessPaymentFacadeDto> {
    return this.processPaymentUsecase.execute(input)
  }
}
