import { ClientModel } from '@checkout/repository/client/client.model'
import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'

@Table({
  tableName: 'orders',
  timestamps: true,
})
export class CheckoutModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @ForeignKey(() => ClientModel)
  @Column({ allowNull: false })
  declare clientId: string

  @Column({ allowNull: false })
  declare status: string

  @CreatedAt
  @Column({ allowNull: false })
  declare createdAt: Date

  @UpdatedAt
  @Column({ allowNull: false })
  declare updatedAt: Date

  @BelongsTo(() => ClientModel)
  declare client: ReturnType<() => ClientModel>
}
