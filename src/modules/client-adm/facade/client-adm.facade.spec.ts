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
    document: 'any_document',
    city: 'any_city',
    state: 'any_state',
    street: 'any_street',
    complement: 'any_complement',
    number: 'any_number',
    zipCode: 'any_zipCode',
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
        document: clientProps.document,
        address: {
          city: clientProps.city,
          state: clientProps.state,
          street: clientProps.street,
          complement: clientProps.complement,
          number: clientProps.number,
          zipCode: clientProps.zipCode,
        },
      })

      const client = await ClientModel.findOne({
        where: { id: clientProps.id },
      })

      expect(client).toMatchObject({
        id: clientProps.id,
        name: clientProps.name,
        email: clientProps.email,
        city: clientProps.city,
        state: clientProps.state,
        street: clientProps.street,
        complement: clientProps.complement,
        number: clientProps.number,
        zipCode: clientProps.zipCode,
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
        document: clientProps.document,
        address: {
          city: clientProps.city,
          state: clientProps.state,
          street: clientProps.street,
          complement: clientProps.complement,
          number: clientProps.number,
          zipCode: clientProps.zipCode,
        },
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })
  })
})
