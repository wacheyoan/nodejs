import { Grille } from "./Grille.js";
function init() {
    const map = document.getElementById('map');
    const view = document.getElementById('view');
    let config = {
        data: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        canvas: map,
        blockStyles: { 1: 'rgb(255,0,0))' },
        couleurFond: '#F6F3F2',
        couleurGrille: '#444444',
        nbRayons: map.width,
        angleRayons: Math.PI * 0.5,
    };
    let grille = new Grille(config);
    window.addEventListener('keyup', (evt) => {
        switch (evt.key) {
            // case 'ArrowUp':point.deltaAvance = 0;break;
            // case 'ArrowDown':point.deltaRecule = 0;break;
            // case 'ArrowLeft':point.deltaPivotGauche = 0;break;
            // case 'ArrowRight':point.deltaPivotDroite = 0;break;
        }
    });
    window.addEventListener('keydown', (evt) => {
        switch (evt.key) {
            // case 'ArrowUp':point.deltaAvance = 1;break;
            // case 'ArrowDown':point.deltaRecule = 1;break;
            // case 'ArrowLeft':point.deltaPivotGauche = 1;break;
            // case 'ArrowRight':point.deltaPivotDroite = 1;break;
        }
    });
    const delay = Math.floor(1000 / 30);
    let lastTime = Date.now();
    function render() {
        const newTime = Date.now();
        const delay = newTime - lastTime;
        grille.dessine();
        /*point.deplace(delay)
        grille.lanceRayons( point.x, point.y, point.angle )
        point.dessine()
        view3D.dessine()
        */
        //console.log(delay)
        lastTime = newTime;
    }
    setInterval(render, delay);
}
init();
//# sourceMappingURL=main.js.map