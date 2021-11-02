"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var Client = /** @class */ (function () {
    function Client(config) {
        this.port = config.port;
        this.address = config.address;
    }
    Client.prototype.ping = function () {
        throw new Error("Method not implemented.");
    };
    return Client;
}());
exports.Client = Client;
