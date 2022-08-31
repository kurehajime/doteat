import { Cell } from "./Cell";
import { Point } from "./Point";

export class Field {
    private width: number;

    constructor(private cells: Cell[]) {
        this.width = Math.sqrt(cells.length)
    }

    get Cells(): Readonly<Cell[]> {
        return Object.freeze(this.cells.map(cell => Object.freeze(cell)));
    }

    getCell(point: Point): Cell {
        return Object.freeze(this.cells[point.x + point.y * this.width]);
    }
}