import { IUserCollection } from "./UserCollection";

export interface IUser {
    /**
    * Identifiant de l'utilisateur
    *
    * @type {string}
    * @memberof IUserConfig
    */
    readonly id: string
    /**
    * Pseudo éventuel de l'utilisateur
    *
    * @type {string}
    * @memberof IUserConfig
    */
    pseudo?: string
    /**
    * Url de l'éventuelle image de l'utilisateur
    *
    * @type {string}
    * @memberof IUserConfig
    */
    imgUrl?: string
    /**
    * Collection à l'intérieur de laquelle est enregistré l'utilisateur
    *
    * @type {IUserCollection}
    * @memberof IUserConfig
    */
    collection: IUserCollection
    /**
    * Liste des identifiants des salons que l'utilisateur à joint
    *
    * @type {Array<string>}
    * @memberof IUser
    */
    rooms?: Array<string>
    /**
    * Méthode permettant d'inclure l'utilisateur dans un salon
    *
    * @param {string} roomId
    * @memberof IUser
    */
    joinRoom (roomId: string): void
    /**
    * Méthode permettant à un utilisateur de quitter un salon
    *
    * @param {string} roomId
    * @memberof IUser
    */
    leaveRoom (roomId: string): void
   }