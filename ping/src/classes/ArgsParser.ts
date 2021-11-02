import { isIPv4 } from "net";
import { IArgsParser } from "../interfaces/ArgsParser";

export class ArgsParser implements IArgsParser{

    args: string[];

    constructor(args:string[]){
        this.args = args;
    } 

    isServer(): boolean {
        return this.args.indexOf('server') !== -1;
    }

    getListeningPort(): number {

        
        let port = this.args.find(args =>{
            return Number.isInteger(Number(args)) && (parseInt(args) >= 10000 && parseInt(args) <= 65535)
        })

        if(port){
            return parseInt(port);
        }

        return 23456;

    }

    getAddress(): string | false {

        let IPv4 = this.args.find(arg =>{
            return isIPv4(arg);
        })

        if(IPv4){
            return IPv4;
        }

        return false;
    }
    
}