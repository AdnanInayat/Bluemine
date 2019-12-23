import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {
  tTicket,
  TicketRelations,
  tUser,
} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import { UserRepository } from './user.repository';

export class TicketRepository extends DefaultCrudRepository<
  tTicket,
  typeof tTicket.prototype.id,
  TicketRelations
> {
  public readonly assignedTo: BelongsToAccessor<tUser,typeof tUser.prototype.id>;
  public readonly assignedBy: BelongsToAccessor<tUser,typeof tUser.prototype.id>;
  
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(tTicket, dataSource);
    this.assignedTo = this.createBelongsToAccessorFor('assignedTo',userRepositoryGetter);
    this.assignedBy = this.createBelongsToAccessorFor('assignedTo',userRepositoryGetter);
  }
}
