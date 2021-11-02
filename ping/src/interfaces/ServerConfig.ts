import net from "net";

export interface IServerConfig {
    /**
    * Numéro de port que le serveur doit écouter sur localhost
    *
    * @type {number}
    * @memberof IServerConfig
    */
    readonly listeningPort: number
    /**
    * Fonction à utiliser pour logger les évènements du serveur
    *
    * @memberof IServerConfig
    */
    readonly log?: (...args: Array<any>) => void
    /**
    * Fonction à utiliser pour logger les évènements d'erreur dans le serveur
    *
    * @memberof IServerConfig
    */
    readonly error?: (...args: Array<any>) => void
    /**
    * Fonction à fournir au serveur qui implémente le traitement à faire les messages réseaux reçus
    *
    * @memberof IServerConfig
    */
    readonly onData: (connexion: net.Socket, data: string) => void
   }