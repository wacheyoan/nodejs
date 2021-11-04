import { Server as SocketIOServer } from "socket.io";
import { IUserCollection } from "./UserCollection";

export interface IWSServer {
    /**
    * Instance du serveur renvoyé par Socket.IO
    *
    * @type {SocketIOServer}
    * @memberof IWSServer
    */
    readonly server: SocketIOServer
    /**
    * Liste des utilisateurs en ligne
    *
    * @type {IUserCollection}
    * @memberof IWSServer
    */
    readonly onlineUsers: IUserCollection
    /**
    * Liste des salons connus du serveur
    *
    * @type {IRoomCollection}
    * @memberof IWSServer
    */
    readonly rooms: IRoomCollection
   }