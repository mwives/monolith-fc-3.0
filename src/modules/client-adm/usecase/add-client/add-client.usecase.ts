import { ClientGateway } from '@client-adm/gateway/client.gateway'
import { UseCaseInterface } from '@shared/usecase/usecase.interface'
import { InputAddClientDto, OutputAddClientDto } from './add-client.usecase.dto'
import { Id } from '@shared/domain/value-object/id.value-object'
import { Client } from '@client-adm/domain/entity/client.entity'
import { Address } from '@client-adm/domain/value-object/address'

export class AddClientUseCase implements UseCaseInterface {
  private clientRepository: ClientGateway

  constructor(clientRepository: ClientGateway) {
    this.clientRepository = clientRepository
  }

  async execute(input: InputAddClientDto): Promise<OutputAddClientDto> {
    const props = {
      id: input.id ? new Id(input.id) : new Id(),
      name: input.name,
      email: input.email,
      document: input.document,
      address: new Address({
        city: input.address.city,
        complement: input.address.complement,
        number: input.address.number,
        state: input.address.state,
        street: input.address.street,
        zipCode: input.address.zipCode,
      }),
    }

    const client = new Client(props)

    await this.clientRepository.add(client)

    return {
      id: client.id.value,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }
}
