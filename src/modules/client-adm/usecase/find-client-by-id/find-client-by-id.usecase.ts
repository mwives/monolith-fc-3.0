import { ClientGateway } from '@client-adm/gateway/client.gateway'
import { UseCaseInterface } from '@shared/usecase/usecase.interface'
import {
  InputFindClientByIdDto,
  OutputFindClientByIdDto,
} from './find-client-by-id.usecase.dto'

export class FindClientByIdUsecase implements UseCaseInterface {
  constructor(private clientRepository: ClientGateway) {}

  async execute(
    input?: InputFindClientByIdDto
  ): Promise<OutputFindClientByIdDto> {
    const client = await this.clientRepository.findById(input.id)

    return {
      id: client.id.value,
      name: client.name,
      email: client.email,
      document: client.document,
      address: {
        city: client.address.city,
        state: client.address.state,
        street: client.address.street,
        complement: client.address.complement,
        number: client.address.number,
        zipCode: client.address.zipCode,
      },
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }
}
