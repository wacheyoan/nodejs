import { IUser } from "../interfaces/User";
import { IUserCollection } from "../interfaces/UserCollection";

export class UserCollection implements IUserCollection{
    ids: string[];
    users: {[k:string]:IUser};
    nextId: number;

    constructor(){
        this.users = {};
        this.ids = [];
        this.nextId = 0;
    }

    get all():Array<string>{return this.ids};
    set all(v:string[]){}

    get(id: string): false | IUser {
        if(id in this.users){
            return this.users[id];
        }
        return false;
    }
    add(user: IUser): void {
        if(!(user.id in this.users)){
            this.ids.push(user.id);
        }
    }
    del(id: string): void {
        if(id in this.users){
            this.ids.splice(this.ids.indexOf(id),1);
        }
    }

    next(...args: [] | [any]): any{
        const currentId = this.nextId;
        this.nextId++;
        if (this.nextId >= this.ids.length) {
            this.nextId = 0
            return { value: this.users[currentId], done: true }
        }
        return { value: this.users[currentId], done: false }
    }
    
}