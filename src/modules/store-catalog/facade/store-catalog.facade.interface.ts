export type OutputFindAllStoreCatalogFacadeDto = {
  products: Array<{
    id: string
    name: string
    description: string
    price: number
  }>
}

export type InputFindByIdStoreCatalogFacadeDto = {
  id: string
}

export type OutputFindByIdStoreCatalogFacadeDto = {
  id: string
  name: string
  description: string
  salesPrice: number
}

export interface StoreCatalogFacadeInterface {
  findAll(): Promise<OutputFindAllStoreCatalogFacadeDto>
  findById(
    dto: InputFindByIdStoreCatalogFacadeDto
  ): Promise<OutputFindByIdStoreCatalogFacadeDto>
}
