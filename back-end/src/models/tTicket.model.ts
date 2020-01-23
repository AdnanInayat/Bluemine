import {
  Entity,
  model,
  property,
  belongsTo,
  hasMany,
  hasOne,
} from '@loopback/repository';
import {tUserCredential} from './tUserCredential.model';
import { tUser } from '.';
import { TComment } from './tComment.model';

@model({name: "tTicket"})
export class tTicket extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'date',
  })
  created_at?: Date;

  @property({
    type: 'date',
  })
  updated_at?: Date;

  @belongsTo(() => tUser, {keyFrom : "assignedByUserId", keyTo: "id"})
  assignedByUserId?: number;

  @belongsTo(() => tUser, {keyFrom : "assignedToUserId", keyTo: "id"})
  assignedToUserId?: number;

  @hasMany(() => TComment, {keyTo: 'ticketId'})
  comments: Array<TComment>

  constructor(data?: Partial<tTicket>) {
    super(data);
  }
}

export interface TicketRelations {
  // describe navigational properties here
}

export type TicketWithRelations = tTicket & TicketRelations;
