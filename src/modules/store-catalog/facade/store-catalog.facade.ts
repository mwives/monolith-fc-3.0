import { UseCaseInterface } from '@shared/usecase/usecase.interface'
import {
  InputFindByIdStoreCatalogFacadeDto,
  OutputFindAllStoreCatalogFacadeDto,
  OutputFindByIdStoreCatalogFacadeDto,
  StoreCatalogFacadeInterface,
} from './store-catalog.facade.interface'

type StoreCatalogFacadeProps = {
  findAllUseCase: UseCaseInterface
  findByIdUseCase: UseCaseInterface
}

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private findAllUseCase: UseCaseInterface
  private findByIdUseCase: UseCaseInterface

  constructor(props: StoreCatalogFacadeProps) {
    this.findAllUseCase = props.findAllUseCase
    this.findByIdUseCase = props.findByIdUseCase
  }

  async findAll(): Promise<OutputFindAllStoreCatalogFacadeDto> {
    return this.findAllUseCase.execute()
  }

  async findById(
    dto: InputFindByIdStoreCatalogFacadeDto
  ): Promise<OutputFindByIdStoreCatalogFacadeDto> {
    return this.findByIdUseCase.execute(dto)
  }
}
