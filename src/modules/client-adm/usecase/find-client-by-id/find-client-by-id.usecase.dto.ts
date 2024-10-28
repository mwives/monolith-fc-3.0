export type InputFindClientByIdDto = {
  id: string
}

export type OutputFindClientByIdDto = {
  id: string
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
  createdAt: Date
  updatedAt: Date
}
