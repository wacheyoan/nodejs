import { IUser } from "../interfaces/User";
import { IUserCollection } from "../interfaces/UserCollection";
import { IUserConfig } from "../interfaces/UserConfig";

export class User implements IUser{

    id: string;
    pseudo?: string | undefined;
    imgUrl?: string | undefined;
    collection: IUserCollection;

    constructor(config:IUserConfig){
        this.pseudo = config.pseudo;
        this.id = config.id;
        this.imgUrl = config.imgUrl;
        this.rooms = [];
        this.collection = config.collection;
        this.collection.add(this);
    }

    rooms?: string[] | undefined;
    joinRoom(roomId: string): void {
        if(this.rooms && !(this.rooms.includes(roomId))){
            this.rooms.push(roomId);
        }
    }
    leaveRoom(roomId: string): void {
        if(this.rooms && this.rooms.includes(roomId)){
            this.rooms.splice(this.rooms.indexOf(roomId),1);
        }
    }
    
}