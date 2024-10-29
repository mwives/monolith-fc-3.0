import { Order } from '@checkout/domain/entity/order.entity'

export interface CheckoutGateway {
  createOrder(order: Order): Promise<void>
  findOrderById(id: string): Promise<Order | null>
}
