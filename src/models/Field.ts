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
        if (point.x === -1 || point.y === -1 || point.x >= this.width || point.y >= this.width) {
            return false;
        }
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

    public GetNext(point: Point, key: string): Point | null {
        let next: Point | null = null;
        switch (key) {
            case "ArrowUp":
                next = { x: point.x, y: point.y - 1 }
                break
            case "ArrowDown":
                next = { x: point.x, y: point.y + 1 }
                break
            case "ArrowLeft":
                next = { x: point.x - 1, y: point.y }
                break
            case "ArrowRight":
                next = { x: point.x + 1, y: point.y }
                break
            default:
                return null
        }
        if (this.IsWalkable(next)) {
            return next;
        }
        return null
    }
}