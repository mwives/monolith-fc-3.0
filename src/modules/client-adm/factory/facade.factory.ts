import { ClientAdmFacade } from '@client-adm/facade/client-adm.facade'
import { ClientRepository } from '@client-adm/repository/client.repository'
import { AddClientUseCase } from '@client-adm/usecase/add-client/add-client.usecase'
import { FindClientByIdUsecase } from '@client-adm/usecase/find-client-by-id/find-client-by-id.usecase'

export class ClientAdmFacadeFactory {
  static create() {
    const clientRepository = new ClientRepository()

    const addUsecase = new AddClientUseCase(clientRepository)
    const findByIdUseCase = new FindClientByIdUsecase(clientRepository)

    return new ClientAdmFacade({
      addUsecase,
      findByIdUseCase,
    })
  }
}
