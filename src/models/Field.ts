import { Cell } from "./Cell";
import { Point } from "./Point";

export class Field {
    private width: number;
    get Width(): number {
        return this.width;
    }
    get Count(): number {
        return this.cells.length;
    }
    get Cells(): Readonly<Cell[]> {
        return Object.freeze(this.cells.map(cell => Object.freeze(cell)));
    }

    constructor(private cells: Cell[]) {
        this.width = Math.sqrt(cells.length)
    }
    public Clone(): Field {
        return new Field(this.cells.map(cell => { return { ...cell } }));
    }
    public GetCell(point: Point): Cell {
        return Object.freeze(this.cells[point.x + point.y * this.width])
    }
    public IsWalkable(point: Point): boolean {
        const cell = this.GetCell(point)
        return cell.State !== "wall";
    }
}