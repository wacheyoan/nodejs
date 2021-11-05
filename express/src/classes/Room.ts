import { IMsg } from "../interfaces/Msg";
import { IRoom } from "../interfaces/Room";
import { IRoomConfig } from "../interfaces/RoomConfig";

export class Room implements IRoom{
    id: string;
    title: string;
    joinedUsers: string[];
    public: boolean;
    adminId: string | false;
    urlImage: string | false;
    messages:IMsg[];

    constructor(config:IRoomConfig){
        this.id = config.id;
        this.title = config.title;
        this.public = config.adminId ? false : true;
        this.adminId = config.adminId ?? false;
        this.urlImage = config.urlImage ?? false;
        this.joinedUsers = config.prejoinedUsers ?? []; 
        this.messages = [];
    }

    addMsg(msg:IMsg){
        this.messages.push(msg);
    }

    joinUser(userId: string): boolean {
        if(!(this.joinedUsers.includes(userId))){
            this.joinedUsers.push(userId);
            return true;
        }
        return false;
    }
    leaveUser(userId: string): void {
        if(this.joinedUsers.includes(userId)){
            this.joinedUsers.splice(this.joinedUsers.indexOf(userId),1);
        }
    }
    
}