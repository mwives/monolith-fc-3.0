import {
  InputAddProductFacadeDto,
  InputCheckStockFacadeDto,
  ProductAdmFacadeInterface,
  OutputCheckStockFacadeDto,
} from '@product-adm/facade/product-adm.facade.interface'
import { UseCaseInterface } from '@shared/usecase/usecase.interface'

export interface UseCasesProps {
  addProductUseCase: UseCaseInterface
  checkStockUseCase: UseCaseInterface
}

export class ProductAdmFacade implements ProductAdmFacadeInterface {
  private addUseCase: UseCaseInterface
  private checkStockUseCase: UseCaseInterface

  constructor(useCasesProps: UseCasesProps) {
    this.addUseCase = useCasesProps.addProductUseCase
    this.checkStockUseCase = useCasesProps.checkStockUseCase
  }

  async addProduct(input: InputAddProductFacadeDto): Promise<void> {
    await this.addUseCase.execute(input)
  }

  async checkStock(
    input: InputCheckStockFacadeDto
  ): Promise<OutputCheckStockFacadeDto> {
    return this.checkStockUseCase.execute(input)
  }
}
