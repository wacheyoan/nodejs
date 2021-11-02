"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = __importDefault(require("process"));
var ArgsParser_1 = require("./classes/ArgsParser");
var OArgsParser = new ArgsParser_1.ArgsParser(process_1.default.argv);
if (OArgsParser.isServer()) {
    var port = OArgsParser.getListeningPort();
    console.log("Try listening on 127.0.0.1:" + port);
}
else {
    var addr = OArgsParser.getAddress();
    if (addr) {
        console.log("Vous voulez ping l'adresse \"" + addr + "\"");
    }
    else {
        console.log('Merci de fournir une adresse valide');
    }
}
