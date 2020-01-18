import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {
  tTicket,
  TicketRelations,
  tUser,
  TComment,
} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import { UserRepository } from './user.repository';
import { CommentRepository } from './comment.repository';

export class TicketRepository extends DefaultCrudRepository<
  tTicket,
  typeof tTicket.prototype.id,
  TicketRelations
> {
  public readonly assignedToUser: BelongsToAccessor<tUser,typeof tUser.prototype.id>;
  public readonly assignedByUser: BelongsToAccessor<tUser,typeof tUser.prototype.id>;
  public readonly comments: HasManyRepositoryFactory<TComment,typeof TComment.prototype.id>;
  
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('CommentRepository')
    protected commentRepositoryGetter: Getter<CommentRepository>,
  ) {
    super(tTicket, dataSource);
    this.assignedToUser = this.createBelongsToAccessorFor('assignedToUser',userRepositoryGetter);
    this.registerInclusionResolver('assignedToUser', this.assignedToUser.inclusionResolver);

    this.assignedByUser = this.createBelongsToAccessorFor('assignedToUser',userRepositoryGetter);
    this.registerInclusionResolver('assignedByUser', this.assignedByUser.inclusionResolver);

    this.comments = this.createHasManyRepositoryFactoryFor('comments', commentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
  }
}
