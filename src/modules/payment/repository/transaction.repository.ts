import { Transaction } from '@payment/domain/transaction'
import { TransactionGateway } from '@payment/gateway/transaction.gateway'
import { TransactionModel } from './transaction.model'

export class TransactionRepository implements TransactionGateway {
  async save(input: Transaction): Promise<Transaction> {
    await TransactionModel.create({
      id: input.id.value,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    })

    return new Transaction({
      id: input.id,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    })
  }
}
