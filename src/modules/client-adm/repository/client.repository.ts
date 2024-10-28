import { Client } from '@client-adm/domain/entity/client.entity'
import { Address } from '@client-adm/domain/value-object/address'
import { ClientGateway } from '@client-adm/gateway/client.gateway'
import { ClientModel } from '@client-adm/repository/client.model'
import { Id } from '@shared/domain/value-object/id.value-object'

export class ClientRepository implements ClientGateway {
  async add(client: Client): Promise<void> {
    const clientData = {
      id: client.id.value,
      name: client.name,
      email: client.email,
      document: client.document,
      zipCode: client.address.zipCode,
      city: client.address.city,
      state: client.address.state,
      street: client.address.street,
      number: client.address.number,
      complement: client.address.complement,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await ClientModel.create(clientData)
  }

  async findById(id: string): Promise<Client | undefined> {
    const client = await ClientModel.findByPk(id)

    if (!client) return undefined

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address({
        zipCode: client.zipCode,
        city: client.city,
        state: client.state,
        street: client.street,
        number: client.number,
        complement: client.complement,
      }),
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    })
  }
}
