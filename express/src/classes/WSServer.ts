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

            socket.on('log', (pseudo: string) => this.log(socket,pseudo));

            socket.on('chat', (msg: any) => this.chat(socket,msg));

            socket.on('chooseRoom', (selectedRoom: string) => this.chooseRoom(socket,selectedRoom))

        })

    }

    log(socket:Socket,pseudo: string) {
        let user = new User({ pseudo, id: socket.id, collection: this.onlineUsers, imgUrl: 'tristan.jpg' });
        this.defaultRoom.joinUser(user.id);

        socket.join(this.defaultRoom.id);

        this.server.to(this.defaultRoom.id).emit('logged', { user: { pseudo }, timer: Date.now(),selectedRoom:this.defaultRoom.id });
        socket.emit('initRooms', this.rooms);
        socket.emit('initUsers', this.defaultRoom.joinedUsers.map(id => {
            //reference circular :'(
            let user = this.onlineUsers.get(id);
            if (user) {
                return { id: user.id, pseudo: user.pseudo, imgUrl: user.imgUrl };
            }
        }));
    }

    chat(socket:Socket,msg:any){

        let user = this.onlineUsers.get(socket.id);
        let room = this.rooms.get(msg.selectedRoom);

        if (user && room) {
            let message = new Msg(msg.msg, user,room.id);
            this.server.to(room.id).emit('chat', { msg: message, user: { id: user.id, pseudo: user.pseudo, imgUrl: user.imgUrl } })
        }
    }

    chooseRoom(socket:Socket,selectedRoom:string) {
        
        let room = this.rooms.get(selectedRoom);
        let user = this.onlineUsers.get(socket.id);

        if (room && user) {
            room.joinUser(user.id);
            socket.join(room.id);
            socket.emit('initUsers', room.joinedUsers.map(id => {
                //reference circular :'(
                let user = this.onlineUsers.get(id);
                if (user) {
                    return { id: user.id, pseudo: user.pseudo, imgUrl: user.imgUrl };
                }
            }))
        }
    }

}