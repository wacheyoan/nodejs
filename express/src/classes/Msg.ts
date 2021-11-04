import { IMsg } from "../interfaces/Msg";
import { IUser } from "../interfaces/User";

export class Msg implements IMsg{
    timestamp?: number | undefined;
    userId?: string | undefined;
    roomId?: string | undefined;
    msg: string;

    constructor(msg:string,user:IUser,roomId:string){
        this.msg = msg;
        this.timestamp = Date.now();
        this.userId = user.id;
        this.roomId = roomId;
    }
    
}