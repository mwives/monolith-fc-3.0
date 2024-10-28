export type InputAddProductFacadeDto = {
  id?: string
  name: string
  description: string
  purchasePrice: number
  stock: number
}

export type InputCheckStockFacadeDto = {
  productId: string
}

export type OutputCheckStockFacadeDto = {
  productId: string
  stock: number
}

export interface ProductAdmFacadeInterface {
  addProduct(input: InputAddProductFacadeDto): Promise<void>
  checkStock(
    input: InputCheckStockFacadeDto
  ): Promise<OutputCheckStockFacadeDto>
}
