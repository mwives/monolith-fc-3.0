import { ClientRepository } from '@client-adm/repository/client.repository'
import { AddClientUseCase } from '@client-adm/usecase/add-client/add-client.usecase'
import { InputAddClientDto } from '@client-adm/usecase/add-client/add-client.usecase.dto'
import express from 'express'

export const clientAdmRouter = express.Router()

clientAdmRouter.post('/', async (req, res) => {
  const usecase = new AddClientUseCase(new ClientRepository())

  try {
    const input: InputAddClientDto = req.body

    const output = await usecase.execute(input)

    res.status(201).send(output)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Internal server error' })
  }
})
