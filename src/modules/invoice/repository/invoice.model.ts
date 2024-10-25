import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import { InvoiceItemModel } from './invoice-item.model'

@Table({
  tableName: 'invoice',
  timestamps: true,
})
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare document: string

  @Column({ allowNull: false })
  declare street: string

  @Column({ allowNull: false })
  declare number: string

  @Column({ allowNull: false })
  declare complement: string

  @Column({ allowNull: false })
  declare city: string

  @Column({ allowNull: false })
  declare state: string

  @Column({ allowNull: false })
  declare zipCode: string

  @CreatedAt
  @Column({ allowNull: false })
  declare createdAt: Date

  @UpdatedAt
  @Column({ allowNull: false })
  declare updatedAt: Date

  @HasMany(() => InvoiceItemModel)
  declare InvoiceItems: InvoiceItemModel[]
}
