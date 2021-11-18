export class Grille {
    constructor(config) {
        this.data = config.data;
        this.nbColonnes = this.data[0].length;
        this.nbLignes = this.data.length;
        this.blockStyles = config.blockStyles;
        this.couleurFond = config.couleurFond;
        this.couleurGrille = config.couleurGrille;
        this.blockHeight = Math.round(config.canvas.height / this.nbLignes);
        this.blockWidth = Math.round(config.canvas.width / this.nbColonnes);
        this.canvas = config.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', (evt) => this.toggleWall(evt));
    }
    toggleWall(evt) {
        let x = Math.floor(evt.clientX / this.blockWidth);
        let y = Math.floor(evt.clientY / this.blockHeight);
        this.data[x][y] = this.data[x][y] === 1 ? 0 : 1;
    }
    dessineGrille() {
        this.ctx.fillStyle = this.couleurFond;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = this.couleurGrille;
        this.ctx.beginPath();
        for (let i = 1; i < this.nbLignes; i++) {
            const y = i * this.blockHeight;
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
        }
        for (let i = 1; i < this.nbColonnes; i++) {
            const x = i * this.blockWidth;
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }
    dessineBlocks() {
        for (let d in this.data) {
            for (let u in this.data[d]) {
                if (this.data[d][u] === 1) {
                    let w = parseFloat(d) * this.blockWidth;
                    let h = parseFloat(u) * this.blockHeight;
                    this.ctx.fillStyle = "red";
                    this.ctx.fillRect(w, h, this.blockWidth, this.blockHeight);
                }
            }
        }
    }
    dessine() {
        this.dessineGrille();
        this.dessineBlocks();
    }
}
//# sourceMappingURL=Grille.js.map