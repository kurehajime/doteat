import { Point } from "./Point"

export type AsterCell = {
    Point: Point
    Cost: number
    Heuristic: number
    ParentPoint: Point | null
}