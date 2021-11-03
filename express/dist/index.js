"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var srv = (0, express_1.default)();
srv.get('/route/:prenom', function (req, res) {
    res.send("Bonjour " + req.params['prenom']);
});
srv.get('/sources/:file', function (req, res) {
    var stream = fs_1.default.createReadStream(__dirname + "/" + req.params['file'], "utf-8");
    stream.pipe(res);
});
srv.listen(8000);
