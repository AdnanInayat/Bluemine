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
  TComment,
} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {tUserCredential} from '../models/tUserCredential.model';
import {UserCredentialsRepository} from './user-credentials.repository';
import { TicketRepository } from './ticket.repository';
import { CommentRepository } from './comment.repository';

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
  public readonly comments: HasManyRepositoryFactory<TComment,typeof TComment.prototype.id>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
    @repository.getter('TicketRepository')
    protected ticketRepositoryGetter: Getter<TicketRepository>,
    @repository.getter('CommentRepository')
    protected commentRepositoryGetter: Getter<CommentRepository>,
  ) {
    super(tUser, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials',userCredentialsRepositoryGetter,);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
    
    this.ticketsAssignedByMe = this.createHasManyRepositoryFactoryFor('ticketsAssignedByMe',ticketRepositoryGetter,);
    this.registerInclusionResolver('ticketsAssignedByMe', this.ticketsAssignedByMe.inclusionResolver);

    this.ticketsAssignedToMe = this.createHasManyRepositoryFactoryFor('ticketsAssignedToMe',ticketRepositoryGetter,);
    this.registerInclusionResolver('ticketsAssignedToMe', this.ticketsAssignedToMe.inclusionResolver);

    this.comments = this.createHasManyRepositoryFactoryFor('comments', commentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
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
