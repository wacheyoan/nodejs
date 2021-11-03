import { IServer } from "../interfaces/Server";
import { IServerConfig } from "../interfaces/ServerConfig";
import  * as ServNet  from "net";

export class Server implements IServer{
    
    readonly listeningPort: number;
    server:ServNet.Server;

    constructor(config: IServerConfig){
        this.listeningPort = config.listeningPort;
        this.onData = config.onData;

        if(config.log){
            this.log = config.log;
        }
        if(config.error){
            this.error = config.error;
        }

        this.server = ServNet.createServer();
        this.server.on('connection',(socket)=>{
            this.log(`Connexion ${socket.remoteAddress}`);

            socket.on('data',(data)=>{
                this.onData(socket,data.toString());
            })
            socket.on('end',() =>{this.log(`Déconnexion ${socket.remoteAddress}`)});

            socket.on('error',(err:any)=>this.error(err))
        });

    }

    log(...args: any[]):void{
        console.log(args);
    };

    error(...args: any[]):void{
        console.error(args);
    };

    onData(cnx: ServNet.Socket,data: string){
        console.log(data);
    };


    listen(): void {
        this.server.listen(this.listeningPort);
    }

    close(): void {
        this.server.close();
    }

}