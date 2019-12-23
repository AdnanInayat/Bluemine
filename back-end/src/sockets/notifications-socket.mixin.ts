import { Class } from '@loopback/repository';
import { Namespace, Server as SocketServer, Socket } from 'socket.io';

export function NotificationsSocketMixin<T extends Class<any>>(baseClass: T) {
    return class extends baseClass {
        public dakiaNotificationsNamespace: Namespace;
        public dakiaNotificationsNamespaceSocket: Socket;
        // public io: SocketServer;
        constructor(...args: any[]) {
            super(args);

            this.dakiaNotificationsNamespace = this.io.of('/dakia-notifications-socket');
            this.dakiaNotificationsSocketConnect();
        }

        dakiaNotificationsSocketConnect() {
            this.dakiaNotificationsNamespace.on('connection', (socket: Socket) => {
                console.log('notifications namespace connected');
                this.dakiaNotificationsNamespaceSocket = socket;
            });
        }

        emitNewSellerDeliveryCreatedNotification() {
            
        }

    };
}