import { Id } from '@shared/domain/value-object/id.value-object'

export class BaseEntity {
  private _id: Id
  private _createdAt: Date
  private _updatedAt: Date

  constructor(id?: Id) {
    this._id = id
    this._createdAt = new Date()
    this._updatedAt = new Date()
  }

  get id(): Id {
    return this._id
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  set updatedAt(date: Date) {
    this._updatedAt = date
  }
}
