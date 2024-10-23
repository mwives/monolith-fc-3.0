export type FindAllProductsDto = {
  products: ProductDto[]
}

export type ProductDto = {
  id: string
  name: string
  description: string
  salesPrice: number
}
