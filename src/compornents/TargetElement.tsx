import { useRecoilValue } from "recoil"
import { targetPointState } from "../states/targetPointState"

type Props = {
    cellSize: number
}
export default function TargetElement(props: Props) {
    const targetPoint = useRecoilValue(targetPointState)
    return (<g>
        <circle
            cx={(targetPoint.x + 0.5) * props.cellSize}
            cy={(targetPoint.y + 0.5) * props.cellSize}
            r={props.cellSize / 2}
            fill={"blue"}
            stroke="black"></circle>
    </g>)
}