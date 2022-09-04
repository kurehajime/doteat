import { Field } from "../models/Field"
import { Point } from "../models/Point"
import { Astar } from "./Astar"

export class Enemy {
    static track(field: Field, enemy: Point, player: Point): Point {
        const path = Astar.findPath(field, enemy, player)
        if (path.length > 0) {
            return path[0]
        }
        return enemy
    }
}