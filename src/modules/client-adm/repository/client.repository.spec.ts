import { Sequelize } from 'sequelize-typescript'

import { Client } from '@client-adm/domain/entity/client.entity'
import { Address } from '@client-adm/domain/value-object/address'
import { ClientModel } from '@client-adm/repository/client.model'
import { ClientRepository } from '@client-adm/repository/client.repository'
import { Id } from '@shared/domain/value-object/id.value-object'

describe('ClientRepository', () => {
  let sequelize: Sequelize
  const clientRepository = new ClientRepository()

  const clientProps = {
    id: new Id('1'),
    name: 'any_name',
    email: 'any_email',
    document: 'any_document',
    address: new Address({
      zipCode: 'any_zipCode',
      city: 'any_city',
      state: 'any_state',
      street: 'any_street',
      number: 'any_number',
      complement: 'any_complement',
    }),
  }

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  describe('add', () => {
    it('should create a client', async () => {
      const client = new Client(clientProps)

      await clientRepository.add(client)

      const clientCreated = await (
        await ClientModel.findByPk(clientProps.id.value)
      ).dataValues

      expect(clientCreated).toMatchObject({
        id: clientProps.id.value,
        name: clientProps.name,
        email: clientProps.email,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })
  })

  describe('findById', () => {
    it('should return a client', async () => {
      const client = new Client(clientProps)
      const clientRepository = new ClientRepository()

      await clientRepository.add(client)

      const clientFound = await clientRepository.findById(clientProps.id.value)

      expect(clientFound).toMatchObject({
        id: clientProps.id,
        name: clientProps.name,
        email: clientProps.email,
        address: clientProps.address,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should return undefined when client is not found', async () => {
      const clientRepository = new ClientRepository()

      const clientFound = await clientRepository.findById(clientProps.id.value)

      expect(clientFound).toBeUndefined()
    })
  })
})
