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
        return new FootPrint([...this.points]);
    }

    public Clear(): FootPrint {
        return new FootPrint([]);
    }

    public Fill(width: number): [boolean, FootPrint | null] {
        const map = Array<number>(width * width).fill(0);
        const queue: number[] = [];
        map.forEach((v, i) => {
            if (this.points.some(p => p.x + p.y * width === i)) {
                map[i] = 1;
            }
        })
        queue.push(0)
        while (queue.length > 0) {
            const i = queue.pop();
            if (i !== undefined) {
                const adjacentIndex = this.getOpenableAdjacentIndex({ x: i % width, y: Math.floor(i / width) }, width);
                map[i] = 2;
                adjacentIndex.forEach(n => {
                    if (map[n] === 0) {
                        queue.push(n);
                    }
                })
            }
        }
        if (map.some(n => n === 0)) {
            return [true, new FootPrint(map.map((n, i) => {
                if (n === 0) {
                    return { x: i % width, y: Math.floor(i / width) };
                }
                if (n === 1) {
                    const adjacentIndex = this.getOpenableAdjacentIndex({ x: i % width, y: Math.floor(i / width) }, width, true);
                    if (adjacentIndex.some(nn => map[nn] === 0)) {
                        return { x: i % width, y: Math.floor(i / width) };
                    }
                }
            }).filter(p => p !== undefined) as Point[])];
        }

        return [false, null];
    }

    private getOpenableAdjacentIndex(point: Point, width: number, oblique = false): number[] {
        const adjacentIndex = [
            point.x > 0 ? { ...point, x: point.x - 1 } : null,
            point.x < width - 1 ? { ...point, x: point.x + 1 } : null,
            point.y > 0 ? { ...point, y: point.y - 1 } : null,
            point.y < width - 1 ? { ...point, y: point.y + 1 } : null,
            oblique && point.x > 0 && point.y > 0 ? { ...point, x: point.x - 1, y: point.y - 1 } : null,
            oblique && point.x < width - 1 && point.y > 0 ? { ...point, x: point.x + 1, y: point.y - 1 } : null,
            oblique && point.x > 0 && point.y < width - 1 ? { ...point, x: point.x - 1, y: point.y + 1 } : null,
            oblique && point.x < width - 1 && point.y < width - 1 ? { ...point, x: point.x + 1, y: point.y + 1 } : null,
        ];
        const result = adjacentIndex.
            filter((p) => { return p !== null }).
            filter(p => {
                return !this.points.some(pp => pp.x === p?.x && pp.y === p?.y);
            }).map(p => {
                const x = p?.x ?? NaN;
                const y = p?.y ?? NaN;
                return x + y * width;
            })
        return result;
    }
}