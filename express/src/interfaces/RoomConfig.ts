import { IUserCollection } from "./UserCollection";

export interface IRoomConfig {
    /**
    * Identifiant du salon
    *
    * @type {string}
    * @memberof IRoomConfig
    */
    readonly id: string
    /**
    * Intitulé du salon
    *
    * @type {string}
    * @memberof IRoomConfig
    */
    readonly title: string
    /**
    * Identifiant de l'éventuel administrateur du salon.
    * (S'il n'y a pas d'administrateur sur ce salon, on est sur un salon public)
    *
    * @type {string}
    * @memberof IRoomConfig
    */
    readonly adminId?: string
    /**
    * URL éventuelle de l'image représentant le salon
    *
    * @type {string}
    * @memberof IRoomConfig
    */
    readonly urlImage?: string
    /**
    * Collection des utilisateurs utilisée par le Web Socket Server
    *
    * @type {IUserCollection}
    * @memberof IRoomConfig
    */
    readonly usersCollection: IUserCollection
    /**
    * Liste des identifiants des utilisateurs qui sont initialement joint au salon courant
    *
    * @type {Array<string>}
    * @memberof IRoomConfig
    */
    readonly prejoinedUsers?: Array<string>
   }