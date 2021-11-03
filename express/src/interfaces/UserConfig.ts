import { IUserCollection } from "./UserCollection";

export interface IUserConfig {
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
    readonly pseudo?: string
    /**
    * Url de l'éventuelle image de l'utilisateur
    *
    * @type {string}
    * @memberof IUserConfig
    */
    readonly imgUrl?: string
    /**
    * Collection à l'intérieur de laquelle est enregistré l'utilisateur
    *
    * @type {IUserCollection}
    * @memberof IUserConfig
    */
    readonly collection: IUserCollection
   }