import process from "process";
import { ArgsParser, IArgsParser } from "./interfaces/ArgsParser";

const OArgsParser:IArgsParser = new ArgsParser(process.argv);

if(OArgsParser.isServer()){
    
    const port:number = OArgsParser.getListeningPort();
    console.log(`Try listening on 127.0.0.1:${port}`)

}else{
    const addr:string | false = OArgsParser.getAddress();

    if(addr){
        console.log(`Vous voulez ping l'adresse "${addr}"`)
    }else{
        console.log('Merci de fournir une adresse valide');
    }
}
