import { useRecoilValue } from "recoil"
import { Point } from "../models/Point"
import { Character } from "../models/Types"
import { EnemyBlueState } from "../states/EnemyBlueState"
import { EnemyOrangeState } from "../states/EnemyOrangeState"
import { EnemyPinkState } from "../states/EnemyPinkState"
import { EnemyRedState } from "../states/EnemyRedState"
import "./EnemyElement.css"

type Props = {
    cellSize: number
    character: Character
}
export default function EnemyRedElement(props: Props) {
    const red = useRecoilValue(EnemyRedState)
    const blue = useRecoilValue(EnemyBlueState)
    const pink = useRecoilValue(EnemyPinkState)
    const orange = useRecoilValue(EnemyOrangeState)
    let enemy: Point = { x: 0, y: 0 }
    switch (props.character) {
        case "red":
            enemy = red.point
            break;
        case "blue":
            enemy = blue.point
            break;
        case "pink":
            enemy = pink.point
            break;
        case "orange":
            enemy = orange.point
            break;
    }

    return (<g>
        <circle className="easeInEnemy"
            cx={(enemy.x + 0.5) * props.cellSize}
            cy={(enemy.y + 0.5) * props.cellSize}
            r={props.cellSize / 2}
            fill={props.character}
            stroke="black"></circle>
    </g>)
}