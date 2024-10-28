import { AggregateRoot } from '@shared/domain/entity/aggregate-root.interface'
import { BaseEntity } from '@shared/domain/entity/base.entity'
import { Id } from '@shared/domain/value-object/id.value-object'
import { InvoiceItem } from './invoice-item'

type InvoiceProps = {
  id?: Id
  name: string
  // document: string
  // address: Address
  address: string
  items: InvoiceItem[]
  createdAt?: Date
  updatedAt?: Date
}

export class Invoice extends BaseEntity implements AggregateRoot {
  _name: string
  // _document: string
  // _address: Address // value object
  _address: string
  _items: InvoiceItem[] // Invoice Items entity

  constructor(props: InvoiceProps) {
    super(props.id)
    this._name = props.name
    // this._document = props.document
    this._address = props.address
    this._items = props.items
  }

  get total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0)
  }

  get name(): string {
    return this._name
  }

  // get document(): string {
  //   return this._document
  // }

  get address(): string {
    return this._address
  }

  get items(): InvoiceItem[] {
    return this._items
  }
}
