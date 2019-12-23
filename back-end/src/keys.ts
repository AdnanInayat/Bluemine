import {BindingKey} from '@loopback/context';
import {PasswordHasher} from './services/hash.password.bcryptjs';
import {TokenService, UserService} from '@loopback/authentication';
import {tUser} from './models';
import {Credentials} from './repositories';
import { SocketConnection } from './sockets/socket.connections';
import { SocketDriver } from './sockets/socket.driver';

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'myjwts3cr3t';
  export const TOKEN_EXPIRES_IN_VALUE = '60000';
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<tUser, Credentials>>(
    'services.user.service',
  );
}
export namespace SocketBindings {
  export const SOCKETS_CONNECTION_BINDING = BindingKey.create<SocketConnection>(
    'socket.connection',
  );
  export const SOCKETS_DRIVER_BINDING = BindingKey.create<SocketDriver>(
    'socket.driver',
  );
}
