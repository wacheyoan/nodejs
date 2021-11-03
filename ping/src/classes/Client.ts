import { IClient } from "../interfaces/Client";
import { IClientConfig } from "../interfaces/ClientConfig";
import net from "net";

export class Client implements IClient{
    port: number;
    address: string;
    connexion: net.Socket


    constructor(config:IClientConfig){
        this.port = config.port;
        this.address = config.address;
        this.connexion = net.createConnection(this.port,this.address);
    }

    ping(): Promise<number | false> {
        const start = Date.now();
        this.connexion.write("PING");
        return new Promise((resolve: (value: number) => void, reject: (value: false) => void) => {
            this.connexion.on('data', (data) => {
                if (data.toString() === "PONG") {
                    const end = Date.now()
                    resolve(end - start)
                }
                else {
                    reject(false)
                }
            })
        })    }
}