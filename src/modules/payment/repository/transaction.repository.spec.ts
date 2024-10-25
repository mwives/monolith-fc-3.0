import { Sequelize } from 'sequelize-typescript'

import { Id } from '@shared/domain/value-object/id.value-object'
import { TransactionModel } from './transaction.model'
import { Transaction } from '@payment/domain/transaction'
import { TransactionRepository } from './transaction.repository'

describe('TransactionRepository', () => {
  let sequelize: Sequelize

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

  describe('save', () => {
    it('should create a transaction', async () => {
      const transaction = new Transaction({
        id: new Id('1'),
        orderId: 'any_order_id',
        amount: 10,
        status: 'approved',
      })

      const transactionRepository = new TransactionRepository()

      await transactionRepository.save(transaction)

      const transactionCreated = await (
        await TransactionModel.findByPk(transaction.id.value)
      ).dataValues

      expect(transactionCreated).toMatchObject({
        id: transaction.id.value,
        orderId: transaction.orderId,
        amount: transaction.amount,
        status: transaction.status,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })
  })
})
