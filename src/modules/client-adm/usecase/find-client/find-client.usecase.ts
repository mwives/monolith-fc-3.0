import { ClientGateway } from '@client-adm/gateway/client.gateway'
import {
  InputFindClientDto,
  OutputFindClientDto,
} from '@client-adm/usecase/find-client/find-client.usecase.dto'
import { UseCaseInterface } from '@shared/usecase/usecase.interface'

export class FindClientUsecase implements UseCaseInterface {
  constructor(private clientRepository: ClientGateway) {}

  async execute(input?: InputFindClientDto): Promise<OutputFindClientDto> {
    const client = await this.clientRepository.findById(input.id)

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
