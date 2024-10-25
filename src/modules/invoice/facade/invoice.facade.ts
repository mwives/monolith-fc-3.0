import { GenerateInvoiceUsecase } from '@invoice/usecase/generate-invoice/generate-invoice.usecase'
import {
  InputFindInvoiceUseCaseDTO,
  InputGenerateInvoiceUseCaseDto,
  InvoiceFacadeInterface,
  OutputFindInvoiceUseCaseDTO,
  OutputGenerateInvoiceUseCaseDto,
} from './facade.interface'
import { FindInvoiceByIdUsecase } from '@invoice/usecase/find-invoice-by-id/find-invoice-by-id.usecase'

export class InvoiceFacade implements InvoiceFacadeInterface {
  constructor(
    private readonly generateInvoiceUseCase: GenerateInvoiceUsecase,
    private readonly findInvoiceByIdUsecase: FindInvoiceByIdUsecase
  ) {}

  async findInvoiceById(
    input: InputFindInvoiceUseCaseDTO
  ): Promise<OutputFindInvoiceUseCaseDTO> {
    return this.findInvoiceByIdUsecase.execute(input)
  }

  async generateInvoice(
    input: InputGenerateInvoiceUseCaseDto
  ): Promise<OutputGenerateInvoiceUseCaseDto> {
    return this.generateInvoiceUseCase.execute(input)
  }
}
