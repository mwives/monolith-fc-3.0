export type InputAddProductDto = {
  id?: string
  name: string
  description: string
  purchasePrice: number
  stock: number
}

export type OutputAddProductDto = {
  id: string
  name: string
  description: string
  purchasePrice: number
  stock: number
  createdAt: Date
  updatedAt: Date
}
