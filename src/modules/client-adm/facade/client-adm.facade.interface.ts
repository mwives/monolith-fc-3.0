export type InputAddClientFacadeDto = {
  id?: string
  name: string
  email: string
  address: string
}

export type OutputAddClientFacadeDto = {
  id: string
  name: string
  email: string
  address: string
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
  address: string
  createdAt: Date
  updatedAt: Date
}

export interface ClientAdmFacadeInterface {
  add(input: InputAddClientFacadeDto): Promise<OutputAddClientFacadeDto>
  findById(input: InputFindClientFacadeDto): Promise<OutputFindClientFacadeDto>
}
