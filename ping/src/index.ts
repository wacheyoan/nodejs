import { Socket } from "net";
import process from "process";
import { ArgsParser } from "./classes/ArgsParser";
import { Client } from "./classes/Client";
import { Server } from "./classes/Server";
import { IArgsParser } from "./interfaces/ArgsParser";
import { IServer } from "./interfaces/Server";

const OArgsParser:IArgsParser = new ArgsParser(process.argv);

if(OArgsParser.isServer()){

    const listeningPort:number = OArgsParser.getListeningPort();
    console.log(`Try listening on 127.0.0.1:${listeningPort}`);

    const server:IServer = new Server({
        listeningPort,
        onData:(cnx:Socket ,data: string) =>{
            if (data === "PING") {
                cnx.write("PONG")
            }    
        }
    })

    server.listen();
    console.log(`Server listening on 127.0.0.1:${listeningPort}`)
    

}else{
    const address:string | false = OArgsParser.getAddress();

    if(address){
        const client:Client = new Client({
            port:23456,
            address
        });
        client.ping().then((delay:number|false)=>{
            console.log(`${delay} ms`)
        }).catch(error => {
            console.error(error);
        })

    }else{
        console.log('Merci de fournir une adresse valide');
    }
}
