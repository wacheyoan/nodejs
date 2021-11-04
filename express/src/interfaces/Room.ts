export interface IRoom {
    /**
    * Identifiant du salon
    *
    * @type {string}
    * @memberof IRoom
    */
    readonly id: string
    /**
    * Intitulé du salon
    *
    * @type {string}
    * @memberof IRoom
    */
    title: string
    /**
    * Liste des identifiants des users qui ont joint ce salon
    *
    * @type {Array<string>}
    * @memberof IRoom
    */
    readonly joinedUsers: Array<string>
    /**
    * Le salon est-il public?
    *
    * @type {boolean}
    * @memberof IRoom
    */
    readonly public: boolean
    /**
    * Si le salon est privé, identifiant de l'administrateur du salon.
    * Si le salon est public -> FALSE
    *
    * @type {(string | false)}
    * @memberof IRoom
    */
    readonly adminId: string | false
    /**
    * URL éventuelle de l'image représentant le salon
    *
    * @type {string}
    * @memberof IRoom
    */
    readonly urlImage: string | false
    /**
    * Joindre l'utilisateur d'identifiant `userId` à ce salon
    *
    * @param {string} userId
    * @returns {boolean}
    * @memberof IRoom
    */
    joinUser (userId: string): boolean
    /**
    * Retirer l'utilisateur d'identifiant `userId` de ce salon
    *
    * @param {string} userId
    * @memberof IRoom
    */
    leaveUser (userId: string): void
   }