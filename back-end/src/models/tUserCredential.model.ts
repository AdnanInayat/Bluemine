import {Entity, model, property, belongsTo} from '@loopback/repository';
import { tUser } from '.';

@model({name: 'tUserCreadential'})
export class tUserCredential extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @belongsTo(() => tUser, {keyFrom : "tUserId", keyTo: "id"})
  tUserId: number;

  constructor(data?: Partial<tUserCredential>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  // describe navigational properties here
}

export type UserCredentialsWithRelations = tUserCredential &
  UserCredentialsRelations;
