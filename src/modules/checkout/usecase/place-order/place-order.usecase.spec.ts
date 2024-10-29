import { Product } from '@checkout/domain/entity/product.entity'
import { Id } from '@shared/domain/value-object/id.value-object'
import { PlaceOrderUsecase } from './place-order.usecase'
import { InputPlaceOrderDto } from './place-order.usecase.dto'

describe('PlaceOrderUsecase', () => {
  const mockDate = new Date('2000-01-01T00:00:00Z')

  const clientFacadeMock = {
    add: jest.fn(),
    findById: jest.fn(),
  }
  const productFacadeMock = {
    addProduct: jest.fn(),
    checkStock: jest.fn(),
  }
  const catalogFacadeMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
  }
  const invoiceFacadeMock = {
    findById: jest.fn(),
    generate: jest.fn(),
  }
  const paymentFacadeMock = {
    process: jest.fn(),
  }
  const checkoutRepositoryMock = {
    createOrder: jest.fn(),
    findOrderById: jest.fn(),
  }

  const usecase = new PlaceOrderUsecase(
    clientFacadeMock,
    productFacadeMock,
    catalogFacadeMock,
    invoiceFacadeMock,
    paymentFacadeMock,
    checkoutRepositoryMock
  )

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers().setSystemTime(mockDate)
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe('execute', () => {
    it('should throw an error when client is not found', async () => {
      clientFacadeMock.findById.mockResolvedValueOnce(null)

      const input: InputPlaceOrderDto = { clientId: '1', products: [] }

      await expect(usecase.execute(input)).rejects.toThrowError(
        'Client not found'
      )
      expect(clientFacadeMock.findById).toHaveBeenCalledWith({
        id: input.clientId,
      })
    })

    it('should throw an error when no products are selected', async () => {
      clientFacadeMock.findById.mockResolvedValueOnce({})
      const validateProductsSpy = jest.spyOn(usecase as any, 'validateProducts')

      const input: InputPlaceOrderDto = { clientId: '1', products: [] }

      await expect(usecase.execute(input)).rejects.toThrowError(
        'No products selected'
      )
      expect(validateProductsSpy).toHaveBeenCalledTimes(1)
    })

    it('should not approve order when payment fails', async () => {
      catalogFacadeMock.findById.mockResolvedValueOnce({
        id: '0',
        name: 'any_name',
        description: 'any_description',
        salesPrice: 10,
      })
      clientFacadeMock.findById.mockResolvedValueOnce({
        id: 'any_clientId',
        name: 'any_name',
        email: 'client@example.com',
        address: 'any_address',
      })
      paymentFacadeMock.process.mockResolvedValueOnce({
        transactionId: 'any_transactionId',
        orderId: 'any_orderId',
        amount: 10,
        status: 'error',
      })
      productFacadeMock.checkStock.mockResolvedValueOnce({ stock: 1 })

      const input: InputPlaceOrderDto = {
        clientId: 'any_clientId',
        products: [{ productId: '0' }],
      }
      const output = await usecase.execute(input)

      expect(output.invoiceId).toBeNull()
      expect(output.total).toBe(10)
      expect(output.products).toMatchObject([{ productId: '0' }])
      expect(checkoutRepositoryMock.createOrder).toHaveBeenCalledTimes(1)
      expect(paymentFacadeMock.process).toHaveBeenCalledWith({
        amount: 10,
        orderId: expect.any(String),
      })
      expect(invoiceFacadeMock.generate).not.toHaveBeenCalled()
    })

    it('should approve order when payment is approved', async () => {
      catalogFacadeMock.findById.mockResolvedValueOnce({
        id: '0',
        name: 'any_name',
        description: 'any_description',
        salesPrice: 10,
      })
      clientFacadeMock.findById.mockResolvedValueOnce({
        id: 'any_clientId',
        name: 'any_name',
        email: 'any_email',
        document: 'any_document',
        address: {
          city: 'any_city',
          state: 'any_state',
          street: 'any_street',
          number: 'any_number',
          zipCode: 'any_zip',
          complement: 'any_complement',
        },
      })
      productFacadeMock.checkStock.mockResolvedValueOnce({ stock: 1 })
      paymentFacadeMock.process.mockResolvedValueOnce({
        transactionId: 'any_transactionId',
        orderId: 'any_orderId',
        amount: 10,
        status: 'approved',
      })
      invoiceFacadeMock.generate.mockResolvedValueOnce({
        id: 'any_invoiceId',
        name: 'any_name',
        address: 'any_address',
        items: [],
      })

      const input: InputPlaceOrderDto = {
        clientId: 'any_clientId',
        products: [{ productId: '0' }],
      }
      const output = await usecase.execute(input)

      expect(output.invoiceId).toBe('any_invoiceId')
      expect(output.total).toBe(10)
      expect(output.products).toMatchObject([{ productId: '0' }])
      expect(invoiceFacadeMock.generate).toHaveBeenCalledWith({
        name: 'any_name',
        document: 'any_document',
        city: 'any_city',
        state: 'any_state',
        street: 'any_street',
        number: 'any_number',
        zipCode: 'any_zip',
        complement: 'any_complement',
        items: [{ id: '0', name: 'any_name', price: 10 }],
      })
    })
  })

  describe('validateProducts', () => {
    it('should throw an error when no products are provided', async () => {
      await expect(usecase['validateProducts']([])).rejects.toThrowError(
        'No products selected'
      )
    })

    it('should throw an error when product is out of stock', async () => {
      clientFacadeMock.findById.mockResolvedValueOnce({})
      productFacadeMock.checkStock.mockImplementation(({ productId }) =>
        Promise.resolve({ productId, stock: productId === '1' ? 0 : 1 })
      )

      const input: InputPlaceOrderDto = {
        clientId: '0',
        products: [{ productId: '1' }],
      }

      await expect(usecase.execute(input)).rejects.toThrowError(
        'Product 1 is out of stock'
      )
      expect(productFacadeMock.checkStock).toHaveBeenCalledTimes(1)
    })
  })

  describe('getProduct', () => {
    it('should throw error when product is not found', async () => {
      catalogFacadeMock.findById.mockResolvedValue(null)

      await expect(usecase['getProduct']('0')).rejects.toThrowError(
        'Product not found'
      )
    })

    it('should return a product', async () => {
      const mockProduct = new Product({
        id: new Id('any_id'),
        name: 'any_name',
        description: 'any_description',
        salesPrice: 10,
      })
      catalogFacadeMock.findById.mockResolvedValueOnce(mockProduct)

      const result = await usecase['getProduct']('any_id')
      expect(result).toMatchObject({
        id: expect.any(Id),
        name: 'any_name',
        description: 'any_description',
        salesPrice: 10,
      })
      expect(catalogFacadeMock.findById).toHaveBeenCalledWith({ id: 'any_id' })
    })
  })
})
