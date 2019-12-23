import {bind, BindingScope} from '@loopback/core';
import { SocketConnection } from "./socket.connections";
import { SocketBindings } from '../keys';
import { NotificationsSocketMixin } from './notifications-socket.mixin';

@bind({
    scope: BindingScope.SINGLETON,
    tags: {
        key: SocketBindings.SOCKETS_DRIVER_BINDING
    }
})
export class SocketDriver extends NotificationsSocketMixin(SocketConnection){
    constructor() {
        super();
    }
}