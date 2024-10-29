import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'

@Table({
  tableName: 'clients',
  timestamps: true,
})
export class ClientModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare email: string

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
}
