import express from 'express'

import { CheckoutRepository } from '@checkout/repository/checkout/checkout.repository'
import { PlaceOrderUsecase } from '@checkout/usecase/place-order/place-order.usecase'
import { ClientAdmFacadeFactory } from '@client-adm/factory/facade.factory'
import { InvoiceFacadeFactory } from '@invoice/factory/invoice.facade.factory'
import { PaymentFacadeFactory } from '@payment/factory/facade.factory'
import { ProductAdmFacadeFactory } from '@product-adm/factory/facade.factory'
import { StoreCatalogFacadeFactory } from '@store-catalog/factory/facade.factory'

export const checkoutRouter = express.Router()

checkoutRouter.post('/', async (req, res) => {
  const usecase = new PlaceOrderUsecase(
    ClientAdmFacadeFactory.create(),
    ProductAdmFacadeFactory.create(),
    StoreCatalogFacadeFactory.create(),
    InvoiceFacadeFactory.create(),
    PaymentFacadeFactory.create(),
    new CheckoutRepository()
  )

  try {
    const input = req.body

    const output = await usecase.execute(input)

    res.status(201).send(output)
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' })
  }
})
