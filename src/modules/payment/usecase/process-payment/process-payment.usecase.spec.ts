import { Transaction } from '@payment/domain/transaction'
import { ProcessPaymentUsecase } from './process-payment.usecase'
import { InputProcessPaymentDto } from './process-payment.usecase.dto'

describe('ProcessPaymentUsecase', () => {
  const approvedTransaction = new Transaction({
    amount: 100,
    orderId: 'any_order_id',
    status: 'approved',
  })

  const declinedTransaction = new Transaction({
    amount: 50,
    orderId: 'any_order_id',
    status: 'declined',
  })

  const transactionRepository = {
    save: jest.fn(),
  }

  describe('execute', () => {
    it('should approve a payment', async () => {
      const useCase = new ProcessPaymentUsecase(transactionRepository)

      const input: InputProcessPaymentDto = {
        orderId: 'any_order_id',
        amount: 100,
      }

      jest
        .spyOn(transactionRepository, 'save')
        .mockResolvedValueOnce(approvedTransaction)

      const result = await useCase.execute(input)

      expect(transactionRepository.save).toHaveBeenCalledTimes(1)
      expect(result.transactionId).toBeDefined()
      expect(result).toMatchObject({
        orderId: input.orderId,
        amount: input.amount,
        status: 'approved',
      })
    })

    it('should decline a payment', async () => {
      const useCase = new ProcessPaymentUsecase(transactionRepository)

      const input: InputProcessPaymentDto = {
        orderId: 'any_order_id',
        amount: 50,
      }

      jest
        .spyOn(transactionRepository, 'save')
        .mockResolvedValueOnce(declinedTransaction)

      const result = await useCase.execute({
        ...input,
        amount: 50,
      })

      expect(transactionRepository.save).toHaveBeenCalledTimes(1)
      expect(result.transactionId).toBeDefined()
      expect(result).toMatchObject({
        orderId: input.orderId,
        amount: input.amount,
        status: 'declined',
      })
    })
  })
})
