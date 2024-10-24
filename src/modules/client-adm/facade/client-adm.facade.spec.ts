import { Sequelize } from 'sequelize-typescript'

import { ClientAdmFacadeFactory } from '@client-adm/factory/facade.factory'
import { ClientModel } from '@client-adm/repository/client.model'

describe('ClientAdmFacade', () => {
  let sequelize: Sequelize
  const facade = ClientAdmFacadeFactory.create()

  const clientProps = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    address: 'any_address',
    createdAt: new Date(),
    updatedAt: new Date(),
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
    it('should add a client', async () => {
      await facade.add({
        id: clientProps.id,
        name: clientProps.name,
        email: clientProps.email,
        address: clientProps.address,
      })

      const client = await ClientModel.findOne({
        where: { id: clientProps.id },
      })

      expect(client).toMatchObject({
        id: clientProps.id,
        name: clientProps.name,
        email: clientProps.email,
        address: clientProps.address,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })
  })

  describe('findById', () => {
    it('should return a client', async () => {
      await ClientModel.create(clientProps)

      const client = await facade.findById({ id: clientProps.id })

      expect(client).toMatchObject({
        id: clientProps.id,
        name: clientProps.name,
        email: clientProps.email,
        address: clientProps.address,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })
  })
})
