import { Client } from '@checkout/domain/entity/client.entity'
import { Order } from '@checkout/domain/entity/order.entity'
import { Product } from '@checkout/domain/entity/product.entity'
import { Address } from '@checkout/domain/value-object/address'
import { CheckoutGateway } from '@checkout/gateway/checkout.gateway'
import {
  InputPlaceOrderDto,
  OutputPlaceOrderDto,
} from '@checkout/usecase/place-order/place-order.usecase.dto'
import { ClientAdmFacadeInterface } from '@client-adm/facade/client-adm.facade.interface'
import { InvoiceFacadeInterface } from '@invoice/facade/facade.interface'
import { PaymentFacadeInterface } from '@payment/facade/facade.interface'
import { ProductAdmFacadeInterface } from '@product-adm/facade/product-adm.facade.interface'
import { Id } from '@shared/domain/value-object/id.value-object'
import { UseCaseInterface } from '@shared/usecase/usecase.interface'
import { StoreCatalogFacadeInterface } from '@store-catalog/facade/store-catalog.facade.interface'

export class PlaceOrderUsecase implements UseCaseInterface {
  constructor(
    private clientFacade: ClientAdmFacadeInterface,
    private productFacade: ProductAdmFacadeInterface,
    private catalogFacade: StoreCatalogFacadeInterface,
    private invoiceFacade: InvoiceFacadeInterface,
    private paymentFacade: PaymentFacadeInterface,
    private checkoutRepository: CheckoutGateway
  ) {}

  async execute(input: InputPlaceOrderDto): Promise<OutputPlaceOrderDto> {
    const foundClient = await this.clientFacade.findById({ id: input.clientId })
    if (!foundClient) throw new Error('Client not found')

    await this.validateProducts(input.products)

    const products = await Promise.all(
      input.products.map(async (product) => this.getProduct(product.productId))
    )

    const client = new Client({
      id: new Id(foundClient.id),
      name: foundClient.name,
      document: foundClient.document,
      address: new Address({
        street: foundClient.address.street,
        number: foundClient.address.number,
        complement: foundClient.address.complement,
        city: foundClient.address.city,
        state: foundClient.address.state,
        zipCode: foundClient.address.zipCode,
      }),
    })

    const order = new Order({
      client,
      products,
    })

    const payment = await this.paymentFacade.process({
      orderId: order.id.value,
      amount: order.total,
    })
    if (payment.status === 'approved') order.approve()

    const invoice =
      payment.status === 'approved'
        ? await this.generateInvoice(client, products)
        : null

    await this.checkoutRepository.createOrder(order)

    return {
      id: order.id.value,
      invoiceId: invoice?.id ?? null,
      status: order.status,
      total: order.total,
      products: this.mapProducts(products),
    }
  }

  private async validateProducts(
    products: InputPlaceOrderDto['products']
  ): Promise<void> {
    if (!products.length) {
      throw new Error('No products selected')
    }

    for (const product of products) {
      const { stock } = await this.productFacade.checkStock({
        productId: product.productId,
      })

      if (stock <= 0) {
        throw new Error(`Product ${product.productId} is out of stock`)
      }
    }
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this.catalogFacade.findById({ id: productId })
    if (!product) throw new Error('Product not found')

    return new Product({
      id: new Id(product.id),
      description: product.description,
      name: product.name,
      salesPrice: product.salesPrice,
    })
  }

  private async generateInvoice(client: Client, products: Product[]) {
    return this.invoiceFacade.generate({
      name: client.name,
      document: client.document,
      city: client.address.city,
      state: client.address.state,
      street: client.address.street,
      number: client.address.number,
      zipCode: client.address.zipCode,
      complement: client.address.complement,
      items: products.map(({ id, name, salesPrice }) => ({
        id: id.value,
        name,
        price: salesPrice,
      })),
    })
  }

  private mapProducts(products: Product[]) {
    return products.map((product) => ({
      productId: product.id.value.toString(),
    }))
  }
}
