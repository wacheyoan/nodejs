import { IClient } from "../interfaces/Client";
import { IClientConfig } from "../interfaces/ClientConfig";

export class Client implements IClient{
    port: number;
    address: string;

    constructor(config:IClientConfig){
        this.port = config.port;
        this.address = config.address
    }

    ping(): Promise<number | false> {
        throw new Error("Method not implemented.");
    }
}