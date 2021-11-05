import { Server as SocketIOServer, Socket } from "socket.io";
import { IRoomCollection } from "../interfaces/RoomCollection";
import { IUserCollection } from "../interfaces/UserCollection";
import { IWSServer } from "../interfaces/WSServer";
import { IWSServerConfig } from "../interfaces/WSServerConfig";
import { Msg } from "./Msg";
import { Room } from "./Room";
import { RoomCollection } from "./RoomCollection";
import { User } from "./User";
import { UserCollection } from "./UserCollection";
import { v4 as uuidv4 } from "uuid";
import { IRoom } from "../interfaces/Room";

export class WSServer implements IWSServer {
    server: SocketIOServer;
    onlineUsers: IUserCollection;
    rooms: IRoomCollection;
    defaultRoom: IRoom;

    constructor(config: IWSServerConfig) {
        this.server = new SocketIOServer(config.httpSrv);
        this.onlineUsers = new UserCollection();
        this.rooms = new RoomCollection();
        this.defaultRoom = new Room({ id: uuidv4(), title: 'Accueil', usersCollection: this.onlineUsers });
        this.rooms.add(this.defaultRoom);

        this.init();

    }

    init() {
        let defaultRoom2 = new Room({ id: uuidv4(), title: 'Zone 2', usersCollection: this.onlineUsers, urlImage: '/sources/tristan.jpg' });
        this.rooms.add(defaultRoom2);

        this.server.on('connection', (socket: Socket) => {

            socket.on('log', (pseudo: string) => this.log(socket, pseudo));

            socket.on('chat', (msg: any) => this.chat(socket, msg));

            socket.on('chooseRoom', (selectedRoom: string) => this.chooseRoom(socket, selectedRoom));

            socket.on('disconnect', () => this.disconnect(socket))

        })

    }

    log(socket: Socket, pseudo: string) {
        this.handleLog(socket,pseudo);
        this.handleRooms(socket,this.rooms);
        this.handleMsgs(socket,this.defaultRoom);
        this.handleUsers(this.defaultRoom);
    }

    handleLog(socket:Socket,pseudo:string){

        let user = new User({ pseudo, id: socket.id, collection: this.onlineUsers, imgUrl: 'tristan.jpg' });
        this.defaultRoom.joinUser(user.id);
        user.joinRoom(this.defaultRoom.id);
        socket.join(this.defaultRoom.id);

        let msg = new Msg(`${user.pseudo} s'est connecté`,user,this.defaultRoom.id);
        this.server.to(this.defaultRoom.id).emit('logged', {msg:msg,user:{ id: user.id, pseudo: user.pseudo, imgUrl: user.imgUrl }});
        this.defaultRoom.addMsg(msg);
    }

    handleUsers(room:IRoom) {
        this.server.to(room.id).emit('initUsers', room.joinedUsers.map(id => {
            //reference circular :'(
            let user = this.onlineUsers.get(id);
            if (user) {
                return { id: user.id, pseudo: user.pseudo, imgUrl: user.imgUrl };
            }
        }));
    }

    handleMsgs(socket:Socket,room:IRoom){
        socket.emit('initMsg',room.messages);
    }

    handleRooms(socket:Socket,rooms:IRoomCollection){
        socket.emit('initRooms', rooms);
    }

    chat(socket: Socket, msg: any) {

        let user = this.onlineUsers.get(socket.id);
        let room = this.rooms.get(msg.selectedRoom);

        if (user && room) {
            let message = new Msg(msg.msg, user, room.id);
            this.server.to(room.id).emit('chat', { msg: message, user: { id: user.id, pseudo: user.pseudo, imgUrl: user.imgUrl } })
            room.addMsg(message);
        }
    }

    disconnect(socket: Socket) {

        let user = this.onlineUsers.get(socket.id);

        if (user) {
            user.rooms?.map((room) => {
                //ts me faisait ch***
                if (user) {
                    socket.to(room).emit('disconnected',
                        {
                            msg: `${user.pseudo} s'est déconnecté`,
                            user: { id: user.id, pseudo: user.pseudo, imgUrl: user.imgUrl },
                            timer:Date.now()
                        });

                    let Oroom = this.rooms.get(room);

                    user.leaveRoom(room);
                    if(Oroom){
                        Oroom.leaveUser(user.id);
                    }
                    
                }
            });

            this.onlineUsers.del(socket.id);

        }

    }

    chooseRoom(socket: Socket, selectedRoom: string) {

        let room = this.rooms.get(selectedRoom);
        let user = this.onlineUsers.get(socket.id);

        if (room && user) {
            room.joinUser(user.id);
            user.joinRoom(room.id);

            socket.join(room.id);
            this.handleUsers(room);
            this.handleMsgs(socket,room);
        }
    }

}