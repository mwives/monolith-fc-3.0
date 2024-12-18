import express from 'express'

import { checkoutRouter } from '@checkout/infra/api/checkout.router'
import { clientAdmRouter } from '@client-adm/infra/api/client-adm.router'
import { invoiceRouter } from '@invoice/infra/api/invoice.router'
import { productAdmRouter } from '@product-adm/infra/api/product-adm.router'

export const app = express()

app.use(express.json())

app.use('/checkout', checkoutRouter)
app.use('/client', clientAdmRouter)
app.use('/invoice', invoiceRouter)
app.use('/product', productAdmRouter)
