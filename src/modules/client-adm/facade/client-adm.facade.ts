import { UseCaseInterface } from '@shared/usecase/usecase.interface'
import {
  ClientAdmFacadeInterface,
  InputAddClientFacadeDto,
  InputFindClientFacadeDto,
  OutputAddClientFacadeDto,
  OutputFindClientFacadeDto,
} from './client-adm.facade.interface'

type Props = {
  addUsecase: UseCaseInterface
  findByIdUseCase: UseCaseInterface
}

export class ClientAdmFacade implements ClientAdmFacadeInterface {
  private addUsecase: UseCaseInterface
  private findByIdUsecase: UseCaseInterface

  constructor(props: Props) {
    this.addUsecase = props.addUsecase
    this.findByIdUsecase = props.findByIdUseCase
  }

  async add(input: InputAddClientFacadeDto): Promise<OutputAddClientFacadeDto> {
    return this.addUsecase.execute(input)
  }

  async findById(
    input: InputFindClientFacadeDto
  ): Promise<OutputFindClientFacadeDto> {
    return this.findByIdUsecase.execute(input)
  }
}
