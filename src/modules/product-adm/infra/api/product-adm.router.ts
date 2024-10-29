import { ProductRepository } from '@product-adm/repository/product.repository'
import { AddProductUseCase } from '@product-adm/usecase/add-product/add-product.usecase'
import express from 'express'

export const productAdmRouter = express.Router()

productAdmRouter.post('/', async (req, res) => {
  const usecase = new AddProductUseCase(new ProductRepository())

  try {
    const input = req.body

    const output = await usecase.execute(input)

    res.status(201).send(output)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Internal server error' })
  }
})
