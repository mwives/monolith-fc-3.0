import { Client } from '@client-adm/domain/entity/client.entity'
import { Address } from '@client-adm/domain/value-object/address'
import { FindClientByIdUsecase } from './find-client-by-id.usecase'

describe('FindClientByIdUsecase', () => {
  const client = new Client({
    name: 'any_name',
    email: 'any_email',
    document: 'any_document',
    address: new Address({
      city: 'any_city',
      complement: 'any_complement',
      number: 'any_number',
      state: 'any_state',
      street: 'any_street',
      zipCode: 'any_zipCode',
    }),
  })

  const clientRepository = {
    add: jest.fn(),
    findById: jest.fn().mockResolvedValue(client),
  }

  describe('execute', () => {
    it('should return a client', async () => {
      const usecase = new FindClientByIdUsecase(clientRepository)
      const response = await usecase.execute({ id: 'any_id' })

      expect(response).toEqual({
        id: expect.any(String),
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
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
      })

      expect(clientRepository.findById).toHaveBeenCalledWith('any_id')
      expect(clientRepository.findById).toHaveBeenCalledTimes(1)
    })
  })
})
