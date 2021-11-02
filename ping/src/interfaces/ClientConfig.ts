export interface IClientConfig {
    /**
    * Adresse du serveur à pinguer
    *
    * @type {string}
    * @memberof IClientConfig
    */
    readonly address: string
    /**
    * Port du serveur à pinguer
    *
    * @type {number}
    * @memberof IClientConfig
    */
    readonly port: number
    /**
    * Méthode custom optionnelle de log (Idem que serveur)
    *
    * @memberof IClientConfig
    */
    readonly log?: (...args: Array<any>) => void
    /**
    * Méthode custom optionnelle d'erreur (Idem que serveur)
    *
    * @memberof IClientConfig
    */
    readonly error?: (...args: Array<any>) => void
   }