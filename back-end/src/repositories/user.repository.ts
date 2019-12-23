import {
  DefaultCrudRepository,
  repository,
  HasOneRepositoryFactory,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {
  tUser,
  UserRelations,
  tTicket,
} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {tUserCredential} from '../models/tUserCredential.model';
import {UserCredentialsRepository} from './user-credentials.repository';
import { TicketRepository } from './ticket.repository';

export interface Credentials {
  email: string;
  password: string;
}

export class UserRepository extends DefaultCrudRepository<
  tUser,
  typeof tUser.prototype.id,
  UserRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<tUserCredential,typeof tUser.prototype.id>;
  public readonly ticketsAssignedByMe: HasManyRepositoryFactory<tTicket,typeof tTicket.prototype.id>;
  public readonly ticketsAssignedToMe: HasManyRepositoryFactory<tTicket,typeof tTicket.prototype.id>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
    @repository.getter('TicketRepository')
    protected ticketRepositoryGetter: Getter<TicketRepository>,
  ) {
    super(tUser, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials',userCredentialsRepositoryGetter,);
    this.ticketsAssignedByMe = this.createHasManyRepositoryFactoryFor('ticketsAssignedByMe',ticketRepositoryGetter,);
    this.ticketsAssignedToMe = this.createHasManyRepositoryFactoryFor('ticketsAssignedToMe',ticketRepositoryGetter,);
  }
  async findCredentials(
    userId: typeof tUser.prototype.id,
  ): Promise<tUserCredential | undefined> {
    try {
      return this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
