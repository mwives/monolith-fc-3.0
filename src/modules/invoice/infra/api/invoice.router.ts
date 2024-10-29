import { InvoiceRepository } from '@invoice/repository/invoice.repository'
import { FindInvoiceByIdUsecase } from '@invoice/usecase/find-invoice-by-id/find-invoice-by-id.usecase'
import express from 'express'

export const invoiceRouter = express.Router()

invoiceRouter.get('/:id', async (req, res) => {
  const usecase = new FindInvoiceByIdUsecase(new InvoiceRepository())

  try {
    const id = req.params.id

    const output = await usecase.execute({ id })

    res.status(200).send(output)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Internal server error' })
  }
})
