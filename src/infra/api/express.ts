import express from 'express'

import { clientAdmRouter } from '@client-adm/infra/api/client-adm.router'
import { productAdmRouter } from '@product-adm/infra/api/product-adm.router'

export const app = express()

app.use(express.json())

app.use('/client', clientAdmRouter)
app.use('/product', productAdmRouter)
