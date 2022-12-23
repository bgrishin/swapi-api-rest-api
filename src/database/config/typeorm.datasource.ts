import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeormConfig } from './typeorm.config';

export const TypeormDatasource = new DataSource(
  TypeormConfig as DataSourceOptions,
);
