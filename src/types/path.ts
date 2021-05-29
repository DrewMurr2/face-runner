
export interface SVG_Path {
    id: string
    // d: string
    stroke: string
    fill: string
    fillRule: string
    sections: SVG_Section[]
}

export interface SVG_Section {
    M: { x: number, y: number },
    Pieces: SVG_Piece[]
}


export interface SVG_Piece {
    C?: SVG_C
    L?: SVG_L
}

export interface SVG_C {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
}

export interface SVG_L {
    segments: {
        x: number,
        y: number
    }[]
}