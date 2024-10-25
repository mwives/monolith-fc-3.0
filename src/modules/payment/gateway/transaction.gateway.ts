import { Transaction } from '@payment/domain/transaction'

export interface TransactionGateway {
  save(input: Transaction): Promise<Transaction>
}
