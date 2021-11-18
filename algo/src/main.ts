import { Grille } from "./Grille.js";
import { IGrilleConfig } from "./IGrilleConfig.js";

function init(){
    const map:HTMLCanvasElement = document.getElementById('map') as HTMLCanvasElement;
    const view:HTMLCanvasElement = document.getElementById('view') as HTMLCanvasElement;

    let config:IGrilleConfig ={
        data: [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ],
        canvas: map,
        blockStyles: {1:'rgb(255,0,0))'},
        couleurFond: '#F6F3F2',
        couleurGrille: '#444444',
        nbRayons: map.width,
        angleRayons: Math.PI * 0.5,
    }

    let grille = new Grille(config);

    window.addEventListener('keyup',(evt:KeyboardEvent)=>{
        switch(evt.key){
            // case 'ArrowUp':point.deltaAvance = 0;break;
            // case 'ArrowDown':point.deltaRecule = 0;break;
            // case 'ArrowLeft':point.deltaPivotGauche = 0;break;
            // case 'ArrowRight':point.deltaPivotDroite = 0;break;
        }
    })

    window.addEventListener('keydown',(evt:KeyboardEvent)=>{
        switch(evt.key){
            // case 'ArrowUp':point.deltaAvance = 1;break;
            // case 'ArrowDown':point.deltaRecule = 1;break;
            // case 'ArrowLeft':point.deltaPivotGauche = 1;break;
            // case 'ArrowRight':point.deltaPivotDroite = 1;break;
        }
    })
    const delay: number = Math.floor(1000 / 30)
    let lastTime: number = Date.now()
    function render () {
        const newTime: number = Date.now()
        const delay: number = newTime - lastTime

        grille.dessine()

        /*point.deplace(delay)
        grille.lanceRayons( point.x, point.y, point.angle )
        point.dessine()
        view3D.dessine()
        */
        //console.log(delay)
        lastTime = newTime
    }
    setInterval(render, delay)
    

}


init();