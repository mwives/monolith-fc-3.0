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
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }
}
