export type InputAddClientDto = {
  id?: string
  name: string
  email: string
  document: string
  address: {
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
  }
}

export type OutputAddClientDto = {
  id: string
  name: string
  email: string
  address: {
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
  }
  createdAt: Date
  updatedAt: Date
}
