import { v4 as uuidv4 } from 'uuid'

import { ValueObject } from '@shared/domain/value-object/value-object.interface'

export class Id implements ValueObject {
  private _id: string

  constructor(id?: string) {
    this._id = id || uuidv4()
  }

  get value(): string {
    return this._id
  }
}
