import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeormDatasource } from '../../database/config/typeorm.datasource';
import { IdEntityInterface } from '../types/id.entity.interface';

@Injectable()
export class RelationsService {
  async addRelations<T extends IdEntityInterface>(
    entity: T,
    relations: Partial<Record<string, string[] | string>>,
  ): Promise<T> {
    const dataSource = await TypeormDatasource.initialize();
    for (const connectedEntityName in relations) {
      if (entity.hasOwnProperty(connectedEntityName)) {
        const generalEntityName =
          this.entityNameTransformer(connectedEntityName);
        const entitiesToConnectPromises = [];
        if (typeof relations[connectedEntityName] === 'object') {
          (relations[connectedEntityName] as string[]).map(async (id) => {
            const entityToConnect = dataSource
              .getRepository(generalEntityName)
              .findOne({
                where: { id },
                loadEagerRelations: false,
              });
            entitiesToConnectPromises.push(entityToConnect);
          });
          let entitiesToConnect = await Promise.all(entitiesToConnectPromises);
          if (entitiesToConnect.some((etc) => !etc))
            throw new NotFoundException();
          entitiesToConnect = entitiesToConnect.filter((etc) =>
            entity[connectedEntityName].every((e) => e.id !== etc.id),
          );
          entity[connectedEntityName].push(...entitiesToConnect);
        } else if (typeof relations[connectedEntityName] === 'string') {
          const id = relations[connectedEntityName];
          const entityToConnect = await dataSource
            .getRepository(generalEntityName)
            .findOne({
              where: { id },
              loadEagerRelations: false,
            });
          if (!entityToConnect) throw new NotFoundException();
          entity[connectedEntityName] = entityToConnect;
        }
      }
    }
    await dataSource.destroy();
    return entity;
  }

  async removeRelations<T extends IdEntityInterface>(
    entity: T,
    relations: Partial<Record<string, string[] | string>>,
  ): Promise<T> {
    const dataSource = await TypeormDatasource.initialize();
    for (const connectedEntityName in relations) {
      if (entity.hasOwnProperty(connectedEntityName)) {
        const generalEntityName =
          this.entityNameTransformer(connectedEntityName);
        if (typeof relations[connectedEntityName] === 'object') {
          const entitiesToDisconnectPromises = [];
          (relations[connectedEntityName] as string[]).map(async (id) => {
            const entityToDisconnect = await dataSource
              .getRepository(generalEntityName)
              .findOne({ where: { id }, loadEagerRelations: false });
            entitiesToDisconnectPromises.push(entityToDisconnect);
          });
          const entitiesToDisconnect = await Promise.all(
            entitiesToDisconnectPromises,
          );
          if (entitiesToDisconnect.some((etd) => !etd))
            throw new NotFoundException();
          entity[connectedEntityName] = entity[connectedEntityName].filter(
            (e) => entitiesToDisconnect.every((etd) => etd.id !== e.id),
          );
        } else if (typeof relations[connectedEntityName] === 'number') {
          const id = relations[connectedEntityName];
          const entityToDisconnect = await dataSource
            .getRepository(generalEntityName)
            .findOne({ where: { id }, loadEagerRelations: false });
          if (!entityToDisconnect) throw new NotFoundException();
          entity[connectedEntityName] = null;
        }
      }
    }
    await dataSource.destroy();
    return entity;
  }

  private entityNameTransformer(name: string): string {
    switch (name) {
      case 'pilots':
      case 'characters':
      case 'residents':
        return 'people';
      case 'homeworld':
        return 'planets';
      case 'planets':
        return 'planet';
      default:
        return name;
    }
  }
}
