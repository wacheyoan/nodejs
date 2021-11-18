export interface IGrille {
    data: Array<Array<number>>
    readonly nbColonnes: number
    readonly nbLignes: number
    blockStyles: { [ blockValue: number]: string }
    couleurFond: string
    couleurGrille: string
    readonly blockHeight: number
    readonly blockWidth: number
    //rayons: Array<{x1: number, y1: number, x2: number, y2: number}>
    //intersections: Array<IIntersection>
    dessineGrille (): void
    dessineBlocks (): void
    //dessineRayons (): void
    dessine (): void
    //lanceRayons (x: number, y: number, angle: number): void
   }