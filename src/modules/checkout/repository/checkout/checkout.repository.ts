import { Order } from '@checkout/domain/entity/order.entity'
import { CheckoutGateway } from '@checkout/gateway/checkout.gateway'
import { CheckoutModel } from './checkout.model'
import { Id } from '@shared/domain/value-object/id.value-object'
import { ClientModel } from '../client/client.model'
import { Client } from '@checkout/domain/entity/client.entity'
import { Address } from '@checkout/domain/value-object/address'

export class CheckoutRepository implements CheckoutGateway {
  async createOrder(order: Order): Promise<void> {
    const orderData = {
      id: order.id.value,
      clientId: order.client.id.value,
      status: order.status,
    }

    await CheckoutModel.create(orderData)
  }

  async findOrderById(id: string): Promise<Order | null> {
    const order = await CheckoutModel.findByPk(id, {
      include: [
        {
          model: ClientModel,
        },
      ],
    })

    if (!order) return null

    return new Order({
      id: new Id(order.id),
      client: new Client({
        id: new Id(order.client.id),
        name: order.client.name,
        document: order.client.document,
        address: new Address({
          street: order.client.street,
          number: order.client.number,
          complement: order.client.complement,
          city: order.client.city,
          state: order.client.state,
          zipCode: order.client.zipCode,
        }),
      }),
      products: [],
    })
  }
}
