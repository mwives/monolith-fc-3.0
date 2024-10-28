import { Order } from '@checkout/domain/order.entity'

export interface CheckoutGateway {
  createOrder(order: Order): Promise<void>
  findOrderById(id: string): Promise<Order | null>
}
