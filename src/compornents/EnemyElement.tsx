import { useRecoilValue } from "recoil"
import { enemyPointState } from "../states/enemyPointState"

type Props = {
    cellSize: number
}
export default function EnemyElement(props: Props) {
    const enemyPoint = useRecoilValue(enemyPointState)
    return (<g>
        <circle
            cx={(enemyPoint.x + 0.5) * props.cellSize}
            cy={(enemyPoint.y + 0.5) * props.cellSize}
            r={props.cellSize / 2}
            fill={"red"}
            stroke="black"></circle>
    </g>)
}