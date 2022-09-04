import { Point } from "./Point";

export class Dots {
    private points: Point[];
    constructor(points: Point[] = []) {
        this.points = points;
    }

    public Eat(point: Point): [boolean, Dots] {
        const hit = this.points.some(p => p.x === point.x && p.y === point.y);
        const newPoints = this.points.filter(p => p.x !== point.x || p.y !== point.y);
        return [hit, new Dots(newPoints)];
    }

    public Hit(point: Point): boolean {
        return this.points.some(p => p.x === point.x && p.y === point.y);
    }
}