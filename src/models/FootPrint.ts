import { Point } from "./Point";

export class FootPrint {
    private points: Point[];
    constructor(points: Point[] = []) {
        this.points = points;
    }

    public Hit(point: Point): boolean {
        return this.points.some(p => p.x === point.x && p.y === point.y);
    }

    public Add(point: Point): FootPrint {
        if (!this.Hit(point)) {
            const f = new FootPrint([...this.points, point])
            f.points.push(point);
            return f;
        }
        return new FootPrint([...this.points, point]);
    }

    public Clear(): FootPrint {
        return new FootPrint([]);
    }
}