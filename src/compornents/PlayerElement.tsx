import { useRecoilValue } from "recoil"
import { PlayerMiliPointState } from "../states/PlayerMiliPointState"
import "./PlayerElement.css"

type Props = {
    cellSize: number
}
export default function PlayerElement(props: Props) {
    const playerMiliPoint = useRecoilValue(PlayerMiliPointState)
    const playerPoint = { x: Math.round(playerMiliPoint.x / props.cellSize), y: Math.round(playerMiliPoint.y / props.cellSize) }

    return (<g>
        <circle className="easeInPlayer"
            cx={(playerPoint.x + 0.5) * props.cellSize}
            cy={(playerPoint.y + 0.5) * props.cellSize}
            r={props.cellSize / 2}
            fill={"yellow"}
            stroke="black"></circle>
    </g>)
}