import { Cell } from "../models/Cell";
import { Field } from "../models/Field";
import { Point } from "../models/Point";

export class Utils {
    static MakeMap(arr: number[][]): Field {
        const width = Math.sqrt(arr.flat(1).length);
        const cells = arr.flat(1).map((p, i) => {
            const x = i % width;
            const y = Math.floor(i / width);
            return {
                Point: { x, y },
                State: p === 1 ? "wall" : "empty"
            } as Cell
        })
        return new Field(cells)
    }
    static ViewRoute(map: Field, route: Point[], startPoint: Point, endPoint: Point): string {
        let str = ""
        map.Cells.forEach((p, i) => {
            if (p.Point.x === startPoint.x && p.Point.y === startPoint.y) {
                str += "S"
            } else if (p.Point.x === endPoint.x && p.Point.y === endPoint.y) {
                str += "G"
            } else if (route.find(r => r.x === p.Point.x && r.y === p.Point.y)) {
                str += "R"
            } else if (p.State === "wall") {
                str += "W"
            } else {
                str += " "
            }
            if (i % map.Width === map.Width - 1) {
                str += "\n"
            }
        })
        return str
    }
}