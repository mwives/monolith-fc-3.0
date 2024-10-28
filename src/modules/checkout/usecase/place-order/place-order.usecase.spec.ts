import { Product } from '@checkout/domain/product.entity'
import { Id } from '@shared/domain/value-object/id.value-object'
import { PlaceOrderUsecase } from './place-order.usecase'
import { InputPlaceOrderDto } from './place-order.usecase.dto'

describe('PlaceOrderUsecase', () => {
  const mockDate = new Date('2000-01-01T00:00:00Z')

  const clientFacadeMock = {
    add: jest.fn(),
    findById: jest.fn().mockResolvedValue({}),
  }
  const productFacadeMock = {
    addProduct: jest.fn(),
    checkStock: jest.fn(({ productId }) =>
      Promise.resolve({ productId, stock: productId === '1' ? 0 : 1 })
    ),
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

  describe('execute', () => {
    it('should throw an error when client not found', async () => {
      clientFacadeMock.findById.mockResolvedValueOnce(null)

      const input: InputPlaceOrderDto = {
        clientId: '1',
        products: [],
      }

      await expect(usecase.execute(input)).rejects.toThrowError(
        'Client not found'
      )
    })

    it('should throw an error when products are invalid', async () => {
      // const mockValidateProducts = jest.spyOn(usecase, 'validateProducts')
      const mockValidateProducts = jest.spyOn(
        usecase as any,
        'validateProducts'
      )

      const input: InputPlaceOrderDto = {
        clientId: '1',
        products: [],
      }

      await expect(usecase.execute(input)).rejects.toThrowError(
        'No products selected'
      )
      expect(mockValidateProducts).toHaveBeenCalledTimes(1)
    })
  })

  describe('placeOrder', () => {
    beforeAll(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(mockDate)
    })

    afterAll(() => {
      jest.useRealTimers()
    })

    const clientProps = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      address: 'any_address',
    }

    // clientFacadeMock.findById.mockResolvedValue(clientProps)

    it('should not approve order', async () => {
      catalogFacadeMock.findById.mockResolvedValueOnce({
        id: '0',
        name: 'any_name',
        description: 'any_description',
        salesPrice: 10,
      })
      paymentFacadeMock.process.mockResolvedValueOnce({
        transactionId: 'any_transactionId',
        orderId: 'any_orderId',
        amount: 100,
        status: 'error',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const validateProductsSpy = jest.spyOn(usecase as any, 'validateProducts')
      const getProductSpy = jest.spyOn(usecase as any, 'getProduct')

      const input: InputPlaceOrderDto = {
        clientId: 'any_clientId',
        products: [{ productId: '0' }],
      }

      const output = await usecase.execute(input)

      expect(output.invoiceId).toBeNull()
      expect(output.total).toBe(10)
      expect(output.products).toMatchObject([{ productId: '0' }])
      expect(clientFacadeMock.findById).toHaveBeenCalledWith({
        id: 'any_clientId',
      })
      expect(validateProductsSpy).toHaveBeenCalledWith(input.products)
      expect(getProductSpy).toHaveBeenCalledTimes(1)
      expect(checkoutRepositoryMock.createOrder).toHaveBeenCalledTimes(1)
      expect(paymentFacadeMock.process).toHaveBeenCalledWith({
        amount: 10,
        orderId: expect.any(String),
      })

      expect(invoiceFacadeMock.generate).not.toHaveBeenCalled()
    })

    it('should approve order', async () => {
      catalogFacadeMock.findById.mockResolvedValueOnce({
        id: '0',
        name: 'any_name',
        description: 'any_description',
        salesPrice: 10,
      })
      paymentFacadeMock.process.mockResolvedValueOnce({
        transactionId: 'any_transactionId',
        orderId: 'any_orderId',
        amount: 100,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      invoiceFacadeMock.generate.mockResolvedValueOnce({
        id: 'any_invoiceId',
        name: 'any_name',
        address: 'any_address',
        items: [],
      })
      clientFacadeMock.findById.mockResolvedValueOnce(clientProps)

      const input: InputPlaceOrderDto = {
        clientId: 'any_clientId',
        products: [{ productId: '0' }],
      }

      const output = await usecase.execute(input)

      expect(output.invoiceId).toBe('any_invoiceId')
      expect(output.total).toBe(10)
      expect(output.products).toMatchObject([{ productId: '0' }])
      expect(clientFacadeMock.findById).toHaveBeenCalledWith({
        id: 'any_clientId',
      })
      expect(checkoutRepositoryMock.createOrder).toHaveBeenCalledTimes(1)
      expect(paymentFacadeMock.process).toHaveBeenCalledWith({
        amount: 10,
        orderId: expect.any(String),
      })
      expect(invoiceFacadeMock.generate).toHaveBeenCalledWith({
        name: clientProps.name,
        address: clientProps.address,
        items: [
          {
            id: '0',
            name: 'any_name',
            price: 10,
          },
        ],
      })
    })
  })

  describe('validateProducts', () => {
    it('should throw an error when products are invalid', async () => {
      const input: InputPlaceOrderDto = {
        clientId: '1',
        products: [],
      }

      await expect(
        usecase['validateProducts'](input.products)
      ).rejects.toThrowError('No products selected')
    })

    it('should throw an error when product is out of stock', async () => {
      let input: InputPlaceOrderDto = {
        clientId: '0',
        products: [{ productId: '1' }],
      }

      await expect(usecase.execute(input)).rejects.toThrowError(
        'Product 1 is out of stock'
      )

      input = {
        clientId: '0',
        products: [{ productId: '0' }, { productId: '1' }, { productId: '2' }],
      }

      await expect(usecase.execute(input)).rejects.toThrowError(
        'Product 1 is out of stock'
      )
      expect(productFacadeMock.checkStock).toHaveBeenCalledTimes(3)
    })
  })

  describe('getProducts', () => {
    beforeAll(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(mockDate)
    })

    afterAll(() => {
      jest.useRealTimers()
    })

    it('should throw error when product not found', async () => {
      jest.spyOn(catalogFacadeMock, 'findById').mockResolvedValue(null)

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
      catalogFacadeMock.findById.mockResolvedValue(mockProduct)

      const result = await catalogFacadeMock.findById({ id: 'any_id' })

      expect(catalogFacadeMock.findById).toHaveBeenCalledWith({ id: 'any_id' })
      expect(result).toEqual(mockProduct)
    })
  })
})
