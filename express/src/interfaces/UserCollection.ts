import { IUser } from "./User";

export interface IUserCollection extends Iterator<IUser> {
    /**
    * Liste des identifiants des utilisateurs
    *
    * @type {Array<string>}
    * @memberof IUsers
    */
    readonly all: Array<string>
    /**
    * Récupération des données d'un utilisateur dont l'identifiant est `id`
    *
    * @param {string} id
    * @returns {(IUser | false)}
    * @memberof IUsers
    */
    get (id: string): IUser | false
    /**
    * Ajoute un utilisateur aux utilisateurs connus de cette collection
    *
    * @param {IUser} user
    * @memberof IUsers
    */
    add (user: IUser): void
    /**
    * Supprime de cette collection un utilisateur avec l'identifiant `id` donné
    *
    * @param {string} id
    * @memberof IUserCollection
    */
    del (id: string): void
   }
   