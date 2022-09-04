import { Field } from "./Field"
import { Point } from "./Point"
import { Astar } from "../logics/Astar"
import { Character, EnemyMode } from "./Types"

export class Enemy {
    public get Mode(): EnemyMode {
        const mode = this.tick / 10
        if (mode % 2 === 0) {
            return "normal"
        }
        return "random"
    }

    constructor(public point: Point, public charactor: Character, public target: Point | null = null, public tick = 0) {
    }

    public setPoint(point: Point): Enemy {
        return new Enemy(point, this.charactor, this.target, this.tick + 1)
    }

    public next(field: Field, enemy: Point, player: Point): Enemy {
        if (this.Mode === "normal") {
            const next = this.track(field, player)
            return new Enemy(next, this.charactor, this.target, this.tick + 1)
        } else {
            const next = this.track(field, player)
            return new Enemy(next, this.charactor, this.target, this.tick + 1)
        }
    }

    private track(field: Field, player: Point): Point {
        const path = Astar.findPath(field, this.point, player)
        if (path.length > 0) {
            return path[0]
        }
        return this.point
    }
}