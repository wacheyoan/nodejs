export interface IArgsParser {
    /**
    * Le programme a-t-il été appelé en tant que Serveur ?
    * Le programme a été appelé en tant que serveur si l'argument "server" est présent au moins une fois sur la ligne de commande.
    *
    * @returns {boolean} True si oui, Faux sinon
    * @memberof IArgsParser
    */
    isServer (): boolean
    /**
    * Renvoie le numéro de port sur lequel écouter les connexions entrantes
    * La valeur est le premier nombre compris entre 10000 et 65535 qui aura été éventuellement transmis sur la ligne de commande.
    * Si aucune valeur transmise, la valeur par défaut est 23456
    *
    * @returns {number}
    * @memberof IArgsParser
    */
    getListeningPort (): number
    /**
    * Renvoie la première adresse IPv4 transmise sur la ligne de commande.
    * Si aucune adresse IPv4 n'a été transmise sur la ligne de commande, renvoyer FALSE
    * 
    * @returns { number | false }
    * @memberof IArgsParser
    */
    getAddress (): string | false
   }

