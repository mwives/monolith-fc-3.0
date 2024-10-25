import { GenerateInvoiceUsecase } from './generate-invoice.usecase'
import { InputGenerateInvoiceUseCaseDto } from './generate-invoice.usecase.dto'

describe('GenerateInvoiceUsecase', () => {
  const invoiceRepository = {
    findById: jest.fn(),
    create: jest.fn(),
  }

  describe('execute', () => {
    const input: InputGenerateInvoiceUseCaseDto = {
      name: 'any_name',
      document: 'any_document',
      street: 'any_street',
      number: 'any_number',
      complement: 'any_complement',
      city: 'any_city',
      state: 'any_state',
      zipCode: 'any_zip_code',
      items: [
        {
          id: 'any_id',
          name: 'any_name',
          price: 10,
        },
      ],
    }

    it('should generate an invoice', async () => {
      const useCase = new GenerateInvoiceUsecase(invoiceRepository)

      const createdInvoice = await useCase.execute(input)

      expect(invoiceRepository.create).toHaveBeenCalledTimes(1)
      expect(createdInvoice).toMatchObject({
        id: expect.any(String),
        name: input.name,
        document: input.document,
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
        items: expect.arrayContaining([
          {
            id: expect.any(String),
            name: input.items[0].name,
            price: input.items[0].price,
          },
        ]),
        total: 10,
      })
    })
  })
})
