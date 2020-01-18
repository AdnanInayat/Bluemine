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
  public readonly assignedTo: BelongsToAccessor<tUser,typeof tUser.prototype.id>;
  public readonly assignedBy: BelongsToAccessor<tUser,typeof tUser.prototype.id>;
  public readonly comments: HasManyRepositoryFactory<TComment,typeof TComment.prototype.id>;
  
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('CommentRepository')
    protected commentRepositoryGetter: Getter<CommentRepository>,
  ) {
    super(tTicket, dataSource);
    this.assignedTo = this.createBelongsToAccessorFor('assignedTo',userRepositoryGetter);
    this.registerInclusionResolver('assignedTo', this.assignedTo.inclusionResolver);

    this.assignedBy = this.createBelongsToAccessorFor('assignedTo',userRepositoryGetter);
    this.registerInclusionResolver('assignedBy', this.assignedBy.inclusionResolver);

    this.comments = this.createHasManyRepositoryFactoryFor('comments', commentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
  }
}
