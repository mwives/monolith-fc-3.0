export type InputAddClientDto = {
  id?: string
  name: string
  email: string
  address: string
}

export type OutputAddClientDto = {
  id: string
  name: string
  email: string
  address: string
  createdAt: Date
  updatedAt: Date
}
