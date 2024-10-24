import { Client } from '@client-adm/domain/client.entity'
import { FindClientUsecase } from '@client-adm/usecase/find-client/find-client.usecase'

describe('FindClientUsecase', () => {
  const client = new Client({
    name: 'any_name',
    email: 'any_email',
    address: 'any_address',
  })

  const clientRepository = {
    add: jest.fn(),
    findById: jest.fn().mockResolvedValue(client),
  }

  describe('execute', () => {
    it('should return a client', async () => {
      const usecase = new FindClientUsecase(clientRepository)
      const response = await usecase.execute({ id: 'any_id' })

      expect(response).toEqual({
        id: expect.any(String),
        name: 'any_name',
        email: 'any_email',
        address: 'any_address',
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
      })

      expect(clientRepository.findById).toHaveBeenCalledWith('any_id')
      expect(clientRepository.findById).toHaveBeenCalledTimes(1)
    })
  })
})
