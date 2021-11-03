"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var net_1 = __importDefault(require("net"));
var Client = /** @class */ (function () {
    function Client(config) {
        this.port = config.port;
        this.address = config.address;
        this.connexion = net_1.default.createConnection(this.port, this.address);
    }
    Client.prototype.ping = function () {
        var _this = this;
        var start = Date.now();
        this.connexion.write("PING");
        return new Promise(function (resolve, reject) {
            _this.connexion.on('data', function (data) {
                if (data.toString() === "PONG") {
                    var end = Date.now();
                    resolve(end - start);
                }
                else {
                    reject(false);
                }
            });
        });
    };
    return Client;
}());
exports.Client = Client;
