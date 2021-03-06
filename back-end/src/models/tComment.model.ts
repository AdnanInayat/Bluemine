import {Entity, model, property, belongsTo} from '@loopback/repository';
import { tTicket, TicketWithRelations } from './tTicket.model';
import { tUser } from '.';

@model({settings: {strict: false}})
export class TComment extends Entity {
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
  body: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  created_at?: Date;

  @property({
    type: 'date',
    default: new Date(),
  })
  updated_at?: Date;

  @belongsTo(() => tTicket, {keyFrom : "ticketId", keyTo: "id"})
  ticketId?: number;

  @belongsTo(() => tUser, {keyFrom : "userId", keyTo: "id"})
  userId?: number;
  constructor(data?: Partial<TComment>) {
    super(data);
  } 
}

export interface TCommentRelations {
  // describe navigational properties here
  tTicket?: TicketWithRelations;
}

export type TCommentWithRelations = TComment & TCommentRelations;
