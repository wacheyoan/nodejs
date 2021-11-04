import { IRoom } from "./Room";

export interface IRoomCollection extends Iterator<IRoom> {
    /**
    * Liste des identifiants des salons
    *
    * @type {Array<string>}
    * @memberof IRoomCollection
    */
    readonly all: Array<string>
    /**
    * Récupération des données d'un salon dont l'identifiant est `id`
    *
    * @param {string} id
    * @returns {(IRoom | false)}
    * @memberof IRoomCollection
    */
    get (id: string): IRoom | false
    /**
    * Ajoute un salon aux salons connus de cette collection
    *
    * @param {IRoom} room
    * @memberof IRoomCollection
    */
    add (room: IRoom): void
    /**
    * Supprime de cette collection un salon avec l'identifiant `id` donné
    *
    * @param {string} id
    * @memberof IRoomCollection
    */
    del (id: string): void
   }