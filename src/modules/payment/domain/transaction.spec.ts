import { Transaction } from './transaction'

describe('Transaction', () => {
  describe('constructor', () => {
    it('should create a new transaction', () => {
      const props = {
        amount: 100,
        orderId: 'order-id',
      }

      const transaction = new Transaction(props)

      expect(transaction).toBeInstanceOf(Transaction)
      expect(transaction).toMatchObject({
        amount: props.amount,
        orderId: props.orderId,
        status: 'pending',
      })
    })
  })

  describe('process', () => {
    it('should approve the transaction', () => {
      const transaction = new Transaction({
        amount: 100,
        orderId: 'order-id',
      })

      transaction.process()

      expect(transaction.status).toBe('approved')
    })

    it('should decline the transaction', () => {
      const transaction = new Transaction({
        amount: 50,
        orderId: 'order-id',
      })

      transaction.process()

      expect(transaction.status).toBe('declined')
    })
  })
})
