import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TComment} from '../models';
import {CommentRepository} from '../repositories';

export class CommentController {
  constructor(
    @repository(CommentRepository)
    public commentRepository : CommentRepository,
  ) {}

  @post('/comments', {
    responses: {
      '200': {
        description: 'TComment model instance',
        content: {'application/json': {schema: getModelSchemaRef(TComment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TComment, {
            title: 'NewTComment',
            exclude: ['id'],
          }),
        },
      },
    })
    tComment: Omit<TComment, 'id'>,
  ): Promise<TComment> {
    return this.commentRepository.create(tComment);
  }

  @get('/comments/count', {
    responses: {
      '200': {
        description: 'TComment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TComment)) where?: Where<TComment>,
  ): Promise<Count> {
    return this.commentRepository.count(where);
  }

  @get('/comments', {
    responses: {
      '200': {
        description: 'Array of TComment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TComment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TComment)) filter?: Filter<TComment>,
  ): Promise<TComment[]> {
    return this.commentRepository.find(filter);
  }

  @patch('/comments', {
    responses: {
      '200': {
        description: 'TComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TComment, {partial: true}),
        },
      },
    })
    tComment: TComment,
    @param.query.object('where', getWhereSchemaFor(TComment)) where?: Where<TComment>,
  ): Promise<Count> {
    return this.commentRepository.updateAll(tComment, where);
  }

  @get('/comments/{id}', {
    responses: {
      '200': {
        description: 'TComment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TComment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(TComment)) filter?: Filter<TComment>
  ): Promise<TComment> {
    return this.commentRepository.findById(id, filter);
  }

  @patch('/comments/{id}', {
    responses: {
      '204': {
        description: 'TComment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TComment, {partial: true}),
        },
      },
    })
    tComment: TComment,
  ): Promise<void> {
    await this.commentRepository.updateById(id, tComment);
  }

  @put('/comments/{id}', {
    responses: {
      '204': {
        description: 'TComment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tComment: TComment,
  ): Promise<void> {
    await this.commentRepository.replaceById(id, tComment);
  }

  @del('/comments/{id}', {
    responses: {
      '204': {
        description: 'TComment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.commentRepository.deleteById(id);
  }
}
