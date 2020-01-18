import {DefaultCrudRepository,repository,BelongsToAccessor,} from '@loopback/repository';
import {TComment,TCommentRelations,tUser, tTicket,} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import { UserRepository } from './user.repository';
import { TicketRepository } from '.';

export class CommentRepository extends DefaultCrudRepository<TComment,typeof TComment.prototype.id,TCommentRelations> 
{
  public readonly ticket: BelongsToAccessor<tTicket,typeof tTicket.prototype.id>;
  public readonly user: BelongsToAccessor<tUser,typeof tUser.prototype.id>;
  
  constructor(@inject('datasources.db') dataSource: DbDataSource,
  @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  @repository.getter('UserRepository') protected ticketRepositoryGetter: Getter<TicketRepository>,) {
    super(TComment, dataSource);
    
    this.ticket = this.createBelongsToAccessorFor('ticket',ticketRepositoryGetter);
    this.registerInclusionResolver('ticket', this.ticket.inclusionResolver);

    this.user = this.createBelongsToAccessorFor('user',userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
