import { Sequelize } from 'sequelize'
import { SequelizeStorage, Umzug } from 'umzug'
import { join } from 'path'

export const migrator = (sequelize: Sequelize) => {
  return new Umzug({
    migrations: {
      glob: [
        '*/infra/db/migrations/*.{js,ts}',
        {
          cwd: join(__dirname, '../../../..'),
          ignore: ['**/*.spec.ts', '**/*.d.ts'],
        },
      ],
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: null,
  })
}
