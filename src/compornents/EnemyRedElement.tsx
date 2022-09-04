import { useRecoilValue } from "recoil"
import { EnemyRedState } from "../states/EnemyRedState"
import "./EnemyRedElement.css"

type Props = {
    cellSize: number
}
export default function EnemyRedElement(props: Props) {
    const enemy = useRecoilValue(EnemyRedState)
    return (<g>
        <circle className="easeInEnemy"
            cx={(enemy.point.x + 0.5) * props.cellSize}
            cy={(enemy.point.y + 0.5) * props.cellSize}
            r={props.cellSize / 2}
            fill={"red"}
            stroke="black"></circle>
    </g>)
}