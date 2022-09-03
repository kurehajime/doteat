import { useRecoilValue } from "recoil"
import { PlayerPointState } from "../states/PlayerPointState"
import "./PlayerElement.css"

type Props = {
    cellSize: number
}
export default function PlayerElement(props: Props) {
    const playerPoint = useRecoilValue(PlayerPointState)
    return (<g>
        <circle className="easeIn"
            cx={(playerPoint.x + 0.5) * props.cellSize}
            cy={(playerPoint.y + 0.5) * props.cellSize}
            r={props.cellSize / 2}
            fill={"yellow"}
            stroke="black"></circle>
    </g>)
}