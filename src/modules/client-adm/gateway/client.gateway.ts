import { Client } from '@client-adm/domain/entity/client.entity'

export interface ClientGateway {
  add(client: Client): Promise<void>
  findById(id: string): Promise<Client | undefined>
}
