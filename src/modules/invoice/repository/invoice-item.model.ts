import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

import { InvoiceModel } from './invoice.model'

@Table({
  tableName: 'invoice_item',
  timestamps: false,
})
export class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  declare invoiceId: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare price: number

  @BelongsTo(() => InvoiceModel)
  declare invoice: ReturnType<() => InvoiceModel>
}
