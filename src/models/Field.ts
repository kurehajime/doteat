import { Cell } from "./Cell";
import { Point } from "./Point";
import { Direction } from "./Types";

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

    public GetDirection(current: Point, target: Point): Direction {
        if (this.GetCell(target).State === "wall") {
            return "none";
        }
        if (current.x < target.x) {
            return "right"
        }
        if (current.x > target.x) {
            return "left"
        }
        if (current.y < target.y) {
            return "bottom"
        }
        if (current.y > target.y) {
            return "top"
        }
        return "none"
    }
}