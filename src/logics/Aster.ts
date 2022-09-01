import { Field } from "../models/Field";
import { Point } from "../models/Point";
type AsterCell = {
    Point: Point
    Cost: number
    Heuristic: number
    Parent: AsterCell | null
    Open: boolean
}

export class Aster {
    static findPath(map: Field, startPoint: Point, endPoint: Point): Point[] {
        let openList: AsterCell[] = []
        let goal: AsterCell | undefined
        openList.push({
            Point: startPoint,
            Cost: 0,
            Heuristic: Aster.getHeuristic(startPoint, endPoint),
            Parent: null,
            Open: true
        })

        while (openList.length < map.Count) {
            const openOpenList = openList.filter(p => p.Open)
            const baseCell = openOpenList.sort((a, b) => (a.Cost + a.Heuristic) - (b.Cost + b.Heuristic))[0]
            openList = Aster.open(map, openList, baseCell, endPoint)
            goal = openList.find(p => p.Point.x === endPoint.x && p.Point.y === endPoint.y)
            if (goal) {
                return Aster.pullGoal(goal)
            }

            if (openList.filter(p => p.Open).length === 0) {
                return []
            }
        }

        return [];
    }

    static pullGoal(goal: AsterCell): Point[] {
        const path: Point[] = [];
        let current = goal;
        while (current.Parent) {
            path.push(current.Point);
            current = current.Parent;
        }
        return path.reverse();
    }

    static open(map: Field, openList: AsterCell[], baseCell: AsterCell, endPoint: Point): AsterCell[] {
        const neighbours = Aster.getNeighbours(map, baseCell.Point);
        for (const neighbour of neighbours) {
            const p = openList.find(p => p.Point.x === neighbour.x && p.Point.y === neighbour.y)
            if (!p) {
                openList.push({
                    Point: neighbour,
                    Cost: 1,
                    Heuristic: Aster.getHeuristic(neighbour, endPoint),
                    Parent: baseCell,
                    Open: true
                })
            }
        }
        const base = openList.filter(p => p.Point.x === baseCell.Point.x && p.Point.y === baseCell.Point.y)[0]
        base.Open = false
        return openList
    }

    static getNeighbours(map: Field, point: Point): Point[] {
        const neighbours: Point[] = [];
        if (point.x > 0) {
            neighbours.push({ x: point.x - 1, y: point.y });
        }
        if (point.y > 0) {
            neighbours.push({ x: point.x, y: point.y - 1 });
        }
        if (point.x < map.Width - 1) {
            neighbours.push({ x: point.x + 1, y: point.y });
        }
        if (point.y < map.Width - 1) {
            neighbours.push({ x: point.x, y: point.y + 1 });
        }
        return neighbours.filter(p => map.IsWalkable(p));
    }

    static getHeuristic(point: Point, endPoint: Point): number {
        return Math.abs(point.x - endPoint.x) + Math.abs(point.y - endPoint.y);
    }
}

