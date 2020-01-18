// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {repository, model, property, Filter} from '@loopback/repository';
import {validateCredentials} from '../services/validator';
import {
  post,
  param,
  get,
  del,
  put,
  requestBody,
  HttpErrors,
  getFilterSchemaFor,
} from '@loopback/rest';
import {tUser } from '../models';
import {UserRepository} from '../repositories';
import {inject} from '@loopback/core';
import {
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';
import {UserProfile, securityId, SecurityBindings} from '@loopback/security';
import {
  CredentialsRequestBody,
  UserProfileSchema,
} from './specs/users-controller.specs';
import {Credentials} from '../repositories/user.repository';
import {PasswordHasher} from '../services/hash.password.bcryptjs';

import {
  TokenServiceBindings,
  PasswordHasherBindings,
  UserServiceBindings,
} from '../keys';
import * as _ from 'lodash';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';

@model()
export class NewUserRequest extends tUser {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class UsersController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<tUser, Credentials>,
  ) {}

  @post('/users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': tUser,
            },
          },
        },
      },
    },
  })
  async signup(
    @requestBody({
      content: {
        'application/json': {},
      },
    })
    newUserRequest: any,
  ): Promise<any> {
    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['email', 'password']));

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );

    try {
      // create the new user
      const savedUser = await this.userRepository.create(
        _.omit(newUserRequest, 'password'),
      );

      // set the password
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});

      //user created now login and send token

      const credentials: Credentials = <Credentials>{
        email: savedUser.email,
        password: newUserRequest.password,
      };
      let loginResponse = await this.login(credentials);

      return loginResponse;
    } catch (error) {
      console.log(error);
      // MongoError 1062 duplicate key
      if (error.errno === 1062 && error.sqlMessage.includes('uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<any> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    const result = {
      userId: userProfile[securityId],
      token: token,
    };
    return result;
    //return {token};
  }

  //TODO: Get all the users if the request is from Admin
  @get('/users', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': tUser,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findUsers(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
    @param.query.object('filter', getFilterSchemaFor(tUser))
    filter?: Filter<tUser>,
  ): Promise<tUser[]> {
    currentUserProfile.id = currentUserProfile[securityId];
    if (currentUserProfile.isAdmin) {
      return this.userRepository.find(filter);
    }
    throw new HttpErrors.Unauthorized();
  }

  @get('/users/{userId}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': tUser,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('userId') userId: number,
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
  ): Promise<tUser> {
    currentUserProfile.id = currentUserProfile[securityId];
    if (currentUserProfile.isAdmin || currentUserProfile.id == userId) {
      //restrict access to own profile apart from admin
      return this.userRepository.findById(userId);
    }
    throw new HttpErrors.Unauthorized();
  }

  @get('/users/me', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
  ): Promise<tUser> {
    currentUserProfile.id = currentUserProfile[securityId];
    delete currentUserProfile[securityId];
    var user = this.userRepository.findById(currentUserProfile.id);
    return user;
  }

  @del('/users/{userId}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(
    @param.path.number('userId') userId: number,
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
  ): Promise<Boolean> {
    if (currentUserProfile.isAdmin) {
      await this.userRepository.deleteById(userId);
      return true;
    }
    throw new HttpErrors.Unauthorized();
  }

  @put('/users/{userId}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'tUser PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.number('userId') userId: number,
    @requestBody() user: tUser,
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
  ): Promise<Boolean> {
    currentUserProfile.id = currentUserProfile[securityId];
    if (currentUserProfile.isAdmin || currentUserProfile.id == userId) {
      //restrict access to own profile apart from admin
      await this.userRepository.updateById(userId, user);
      return true;
    }
    throw new HttpErrors.Unauthorized();
  }
  @get('/users/dd', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Users for dropdown',
        content: {
          'application/json': {
            schema: {},
          },
        },
      },
    },
  })
  async usersForDropdown(): Promise<Array<any>> {
    var users = await this.userRepository.find();
    let ddUsers = Array<any>();
    users.forEach((v, i)=>{
      ddUsers.push({
        id: v.id,
        name: v.name
      })
    });
    return ddUsers;
  }
}
