import { bind, BindingScope, inject, CoreBindings, Application } from '@loopback/core';
import { Server as SocketServer } from 'socket.io';
import * as socketio from 'socket.io';
import { BlueMineApiApplication } from '..';
import { SocketBindings } from '../keys';
import { AnyObject } from '@loopback/repository';

@bind({
    scope: BindingScope.SINGLETON,
    tags: {
        key: SocketBindings.SOCKETS_CONNECTION_BINDING
    }
})
export class SocketConnection {
    io: SocketServer;
    socket: socketio.Socket;
    connectedUsers: number[] = [];
    socketsObjs: any = {};
    constructor(
    ) {
        console.log('message socket initialized. now you are gonna chit chat');
        this.io = socketio(3002, {
            serveClient: false
        });
        this.onConnect();
    }

    private onConnect() {
        this.io.on('connection', (socket: socketio.Socket) => {
            socket.on("save-me", (data: AnyObject) => {
                this.socketsObjs[data.userId] = data.socketId;
            });
            socket.emit("connection", socket.id);

            this.socket = socket;
            BlueMineApiApplication.socketsCount++;                          
            //console.log('User Connected', BlueMineApiApplication.socketsCount);
            this.socket.on('disconnect', () => {
                BlueMineApiApplication.socketsCount--;
                //console.log('disconnected', 'connected: ', BlueMineApiApplication.socketsCount);
            });

            this.socket.on("message ", (receiverId) => {
                //console.log("receiver id: ", receiverId, this.socketsObjs[receiverId]);
                if (!!this.socketsObjs[receiverId]) {
                    if(!!this.io.sockets.sockets[this.socketsObjs[receiverId]]){
                        this.io.sockets.sockets[this.socketsObjs[receiverId]].emit("message ");
                    }
                }
            })

            this.InitHeartBeat();
        });
    }

    private InitHeartBeat() {
        this.socket.on('lb-ping', (userId: number) => {
            //console.log(this.io.sockets.name, Object.keys(this.socketsObjs));
            this.socket.emit('lb-pong', "pong");
        });
    }
}