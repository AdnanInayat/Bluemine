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
import {tTicket} from '../models';
import {TicketRepository} from '../repositories';
import {UserProfile, securityId, SecurityBindings} from '@loopback/security';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

export class TicketController {
  constructor(
    @repository(TicketRepository)
    public ticketRepository : TicketRepository,
  ) {}

  @post('/ticket', {
    responses: {
      '200': {
        description: 'tTicket model instance',
        content: {'application/json': {schema: getModelSchemaRef(tTicket)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(tTicket, {
            title: 'NewtTicket',
            exclude: ['id'],
          }),
        },
      },
    })
    tTicket: Omit<tTicket, 'id'>,
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
  ): Promise<tTicket> {
    currentUserProfile.id = currentUserProfile[securityId];
    tTicket.assignedByUserId = parseInt(currentUserProfile.id, 10);
    tTicket.created_at = new Date();
    tTicket.updated_at = new Date();
    console.log(tTicket);
    return this.ticketRepository.create(tTicket);
  }

  @get('/ticket/count', {
    responses: {
      '200': {
        description: 'tTicket model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.query.object('where', getWhereSchemaFor(tTicket)) where?: Where<tTicket>,
  ): Promise<Count> {
    return this.ticketRepository.count(where);
  }

  @get('/ticket', {
    responses: {
      '200': {
        description: 'Array of tTicket model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(tTicket, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  // @authenticate('jwt')
  async find(
    @param.query.object('filter', getFilterSchemaFor(tTicket)) filter?: Filter<tTicket>,
  ): Promise<tTicket[]> {
    return this.ticketRepository.find(filter);
  }

  // {include:[{relation:'comments'}]}

  @patch('/ticket', {
    responses: {
      '200': {
        description: 'tTicket PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(tTicket, {partial: true}),
        },
      },
    })
    tTicket: tTicket,
    @param.query.object('where', getWhereSchemaFor(tTicket)) where?: Where<tTicket>,
  ): Promise<Count> {
    return this.ticketRepository.updateAll(tTicket, where);
  }

  @get('/ticket/{id}', {
    responses: {
      '200': {
        description: 'tTicket model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(tTicket, {includeRelations: true}),
          },
        },
      },
    },
  })
  // @authenticate('jwt')
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(tTicket)) filter?: Filter<tTicket>
  ): Promise<tTicket> {
    return this.ticketRepository.findById(id, filter);
    // {include:[{relation:'comments', scope:{skip:0,limit:5}}]}
  }

  @patch('/ticket/{id}', {
    responses: {
      '204': {
        description: 'tTicket PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(tTicket, {partial: true}),
        },
      },
    })
    tTicket: tTicket,
  ): Promise<void> {
    tTicket.updated_at = new Date();
    await this.ticketRepository.updateById(id, tTicket);
  }

  @put('/ticket/{id}', {
    responses: {
      '204': {
        description: 'tTicket PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tTicket: tTicket,
  ): Promise<void> {
    await this.ticketRepository.replaceById(id, tTicket);
  }

  @del('/ticket/{id}', {
    responses: {
      '204': {
        description: 'tTicket DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ticketRepository.deleteById(id);
  }
}
