import {
  Entity,
  model,
  property,
  belongsTo,
  hasMany,
  hasOne,
} from '@loopback/repository';
import {tUserCredential} from './tUserCredential.model';
import { tTicket } from './tTicket.model';
import { TComment } from '.';

@model({
  settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class tUser extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  gender?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'boolean',
    default: 0,
  })
  deleted?: boolean;

  @property({
    type: 'boolean',
  })
  active?: boolean;

  @property({
    type: 'boolean',
  })
  isAdmin: boolean;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @hasOne(() => tUserCredential)
  userCredentials: tUserCredential;

  @hasMany(() => tTicket, {keyTo: 'assignedByUserId'})
  ticketsAssignedByMe: Array<tTicket>

  @hasMany(() => tTicket, {keyTo: 'assignedToUserId'})
  ticketsAssignedToMe: Array<tTicket>
  
  @hasMany(() => TComment, {keyTo: 'userId'})
  comments: Array<TComment>

  constructor(data?: Partial<tUser>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = tUser & UserRelations;
