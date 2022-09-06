import { Field } from "./Field"
import { Point } from "./Point"
import { Astar } from "../logics/Astar"
import { Character, EnemyMode } from "./Types"
import { Dots } from "./Dots"

export class Enemy {
    public get Mode(): EnemyMode {
        const mode = (this.tick / 35 | 0)
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

    public next(field: Field, player: Point, dots: Dots): Enemy {
        if (this.Mode === "normal") {
            let next: Point = { x: 0, y: 0 }
            switch (this.charactor) {
                case "red":
                    next = this.track(field, player)
                    break
                case "blue":
                    next = this.random(field, dots)[0]
                    break
                case "pink":
                    next = this.track(field, player)
                    break
                case "orange":
                    next = this.track(field, player)
                    break
            }
            return new Enemy(next, this.charactor, this.target, this.tick + 1)
        } else {
            const next = this.random(field, dots)
            return new Enemy(next[0], this.charactor, next[1], this.tick + 1)
        }
    }

    private track(field: Field, target: Point): Point {
        const path = Astar.findPath(field, this.point, target)
        if (path.length > 0) {
            return path[0]
        }
        return this.point
    }
    private random(field: Field, dots: Dots): [next: Point, newTarget: Point] {
        let target = this.target || this.point
        if (!this.target || this.target.x === this.point.x && this.target.y === this.point.y) {
            const walkable = field.Cells.filter(c => dots.Hit(c.Point))
            const index = Math.floor(Math.random() * walkable.length)
            target = walkable[index].Point
        }
        return [this.track(field, target), target]
    }
}