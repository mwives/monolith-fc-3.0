import { Client } from '@client-adm/domain/client.entity'

export interface ClientGateway {
  add(client: Client): Promise<void>
  findById(id: string): Promise<Client | undefined>
}
