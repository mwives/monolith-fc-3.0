export type InputFindClientByIdDto = {
  id: string
}

export type OutputFindClientByIdDto = {
  id: string
  name: string
  email: string
  address: string
  createdAt: Date
  updatedAt: Date
}
