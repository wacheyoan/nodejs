export interface IWSServerConfig {
    /**
    * Instance du Serveur HTTP renvoyé par http.createServer()
    *
    * @type {http.Server}
    * @memberof IWSServerConfig
    */
    httpSrv: http.Server
    /**
    * Eventuelle fonctione de log customisée.
    * Si aucune fonction n'est fournie, utiliser console.log
    *
    * @memberof IWSServerConfig
    */
    log?: (...args: Array<any>) => void
   }