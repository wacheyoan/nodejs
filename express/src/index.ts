import express from "express";
import http from "http";
import {Server, Socket} from "socket.io";
import path from "path";
import { User } from "./classes/User";
import { UserCollection } from "./classes/UserCollection";
import { IUser } from "./interfaces/User";

const srv = express();
const httpSrv = http.createServer(srv);
const wsSrv = new Server(httpSrv);

let collection = new UserCollection();

srv.get('/route/:prenom',(req,res) => {
    res.send(`Bonjour ${req.params['prenom']}`);
})

srv.get('/sources/:file',(req,res) => {
    res.sendFile(path.join(__dirname,'..','public',req.params['file']));
})

wsSrv.on('connection',(socket:Socket)=>{

    let user:IUser | null = null;

    socket.on('log',(pseudo:string) =>{
        user = new User({pseudo,id:socket.id,collection,imgUrl:'tristan.jpg'});
        socket.emit('log',{user:user,timer:Date.now()})
    });

    socket.on('chat',(msg:string) => {
        if(user){
            socket.emit('chat',{user:user,msg:msg,timer:Date.now()})
        }
    })
})

const port:number = 8000;


httpSrv.listen(port,() => {
    console.log(`Serveur en écoute sur ${port} ...`)
});