"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = __importDefault(require("process"));
var ArgsParser_1 = require("./classes/ArgsParser");
var Client_1 = require("./classes/Client");
var Server_1 = require("./classes/Server");
var OArgsParser = new ArgsParser_1.ArgsParser(process_1.default.argv);
if (OArgsParser.isServer()) {
    var listeningPort = OArgsParser.getListeningPort();
    console.log("Try listening on 127.0.0.1:" + listeningPort);
    var server = new Server_1.Server({
        listeningPort: listeningPort,
        onData: function (cnx, data) {
            if (data === "PING") {
                cnx.write("PONG");
            }
        }
    });
    server.listen();
    console.log("Server listening on 127.0.0.1:" + listeningPort);
}
else {
    var address = OArgsParser.getAddress();
    if (address) {
        var client = new Client_1.Client({
            port: 23456,
            address: address
        });
        client.ping().then(function (delay) {
            console.log(delay + " ms");
        }).catch(function (error) {
            console.error(error);
        });
    }
    else {
        console.log('Merci de fournir une adresse valide');
    }
}
