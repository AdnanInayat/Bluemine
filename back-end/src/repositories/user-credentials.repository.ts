import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {tUserCredential, UserCredentialsRelations} from '../models/tUserCredential.model';
import {inject} from '@loopback/core';
import { DbDataSource } from '../datasources';

export class UserCredentialsRepository extends DefaultCrudRepository<
tUserCredential,
  typeof tUserCredential.prototype.id,
  UserCredentialsRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(tUserCredential, dataSource);
  }
}
