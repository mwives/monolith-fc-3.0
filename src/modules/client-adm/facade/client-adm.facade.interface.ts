export type InputAddClientFacadeDto = {
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

export type OutputAddClientFacadeDto = {
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

export type InputFindClientFacadeDto = {
  id: string
}

export type OutputFindClientFacadeDto = {
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

export interface ClientAdmFacadeInterface {
  add(input: InputAddClientFacadeDto): Promise<OutputAddClientFacadeDto>
  findById(input: InputFindClientFacadeDto): Promise<OutputFindClientFacadeDto>
}
