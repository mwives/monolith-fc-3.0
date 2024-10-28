import { AddClientUseCase } from './add-client.usecase'
import { InputAddClientDto } from './add-client.usecase.dto'

describe('AddClientUsecase', () => {
  const clientRepository = {
    add: jest.fn(),
    findById: jest.fn(),
  }

  describe('execute', () => {
    it('should add a client', async () => {
      const useCase = new AddClientUseCase(clientRepository)

      clientRepository.add.mockResolvedValueOnce(null)

      const input: InputAddClientDto = {
        name: 'any_name',
        email: 'any_email',
        document: 'any_document',
        address: {
          city: 'any_city',
          complement: 'any_complement',
          number: 'any_number',
          state: 'any_state',
          street: 'any_street',
          zipCode: 'any_zipCode',
        },
      }

      const result = await useCase.execute(input)

      expect(clientRepository.add).toHaveBeenCalledTimes(1)
      expect(result).toMatchObject({
        id: expect.any(String),
        name: 'any_name',
        email: 'any_email',
        address: {
          city: 'any_city',
          complement: 'any_complement',
          number: 'any_number',
          state: 'any_state',
          street: 'any_street',
          zipCode: 'any_zipCode',
        },
      })
    })
  })
})
