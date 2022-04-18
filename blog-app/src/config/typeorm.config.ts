//configuration for DB connectivity

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeORMConfiguration: TypeOrmModuleOptions = {
  username: 'postgres',
  password: 'root',
  port: 5432,
  host: 'localhost',
  type: 'postgres',
  database: 'BlogAppV1',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],

  // true: all the properties in the entity classes will be synchronized with database
  synchronize: true,
};
