import { Client } from '@client-adm/domain/client.entity'
import { ClientGateway } from '@client-adm/gateway/client.gateway'
import { ClientModel } from '@client-adm/repository/client.model'
import { Id } from '@shared/domain/value-object/id.value-object'

export class ClientRepository implements ClientGateway {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.value,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  async findById(id: string): Promise<Client | undefined> {
    const client = await ClientModel.findByPk(id)

    if (!client) return undefined

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    })
  }
}
