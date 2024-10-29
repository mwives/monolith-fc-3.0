import { Sequelize } from 'sequelize-typescript'
import request from 'supertest'

import { ClientModel } from '@client-adm/repository/client.model'
import { InputAddClientDto } from '@client-adm/usecase/add-client/add-client.usecase.dto'
import { app } from '@infra/api/express'

describe('clientAdmRouter E2E', () => {
  let sequelize: Sequelize

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

  describe('POST /client', () => {
    const createClient = async (data: InputAddClientDto) =>
      request(app).post('/client').send(data)

    it('should create a client and return 201', async () => {
      const response = await createClient({
        name: 'any_name',
        email: 'any_email',
        document: 'any_document',
        address: {
          street: 'any_street',
          number: 'any_number',
          city: 'any_city',
          state: 'any_state',
          zipCode: 'any_zipCode',
          complement: 'any_complement',
        },
      })

      expect(response.status).toBe(201)

      const createdClient = await ClientModel.findOne({
        where: {
          name: 'any_name',
          email: 'any_email',
        },
      })

      expect(createdClient).toBeTruthy()
    })
  })
})
