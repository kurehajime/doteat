import { useRecoilValue } from "recoil"
import { EnemyPointState } from "../states/EnemyPointState"
import "./EnemyElement.css"

type Props = {
    cellSize: number
}
export default function EnemyElement(props: Props) {
    const enemyPoint = useRecoilValue(EnemyPointState)
    return (<g>
        <circle className="easeInEnemy"
            cx={(enemyPoint.x + 0.5) * props.cellSize}
            cy={(enemyPoint.y + 0.5) * props.cellSize}
            r={props.cellSize / 2}
            fill={"red"}
            stroke="black"></circle>
    </g>)
}