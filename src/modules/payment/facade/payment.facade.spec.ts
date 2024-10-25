import { Sequelize } from 'sequelize-typescript'

import { PaymentFacadeFactory } from '@payment/factory/facade.factory'
import { TransactionModel } from '@payment/repository/transaction.model'

describe('PaymentFacade', () => {
  let sequelize: Sequelize
  const facade = PaymentFacadeFactory.create()

  const paymentProps = {
    id: 'any_id',
    orderId: 'any_order_id',
    amount: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([TransactionModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  describe('processPayment', () => {
    it('should process a payment', async () => {
      const payment = await facade.process({
        amount: paymentProps.amount,
        orderId: paymentProps.orderId,
      })

      const createdPayment = await TransactionModel.findOne({
        where: { id: payment.transactionId },
      })

      expect(createdPayment).toMatchObject({
        id: payment.transactionId,
        orderId: payment.orderId,
        amount: payment.amount,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })
  })
})
