import { IRoom } from "../interfaces/Room";
import { IRoomCollection } from "../interfaces/RoomCollection";

export class RoomCollection implements IRoomCollection{

    ids: string[];
    rooms: {[k:string]:IRoom};
    nextId: number;

    constructor(){
        this.rooms = {};
        this.ids = [];
        this.nextId = 0;
    }

    get all():Array<string>{return this.ids};
    set all(v:string[]){}

    get(id: string): false | IRoom {
        if(id in this.rooms){
            return this.rooms[id];
        }
        return false;
    }
    add(room: IRoom): void {
        if(!(room.id in this.rooms)){
            this.ids.push(room.id);
            this.rooms[room.id] = room;
        }
    }
    del(id: string): void {
        if(id in this.rooms){
            this.ids.splice(this.ids.indexOf(id),1);
            delete this.rooms[id];
        }
    }

    next(...args: [] | [any]): any{
        const currentId = this.nextId;
        this.nextId++;
        if (this.nextId >= this.ids.length) {
            this.nextId = 0
            return { value: this.rooms[currentId], done: true }
        }
        return { value: this.rooms[currentId], done: false }
    }
    
}