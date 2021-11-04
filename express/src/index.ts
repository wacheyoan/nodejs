import express from "express";
import http from "http";
import path from "path";
import { WSServer } from "./classes/WSServer";

const srv = express();
const httpSrv = http.createServer(srv);

new WSServer({httpSrv});

srv.get('/salon/:number',(req,res) => {
    res.send(`Bonjour ${req.params['number']}`);
})

srv.get('/sources/:file',(req,res) => {
    res.sendFile(path.join(__dirname,'..','public',req.params['file']));
})

httpSrv.listen(8000);
