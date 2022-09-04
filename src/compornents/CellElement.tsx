import { useRecoilValue } from "recoil"
import { Cell } from "../models/Cell"
import { DotsState } from "../states/DotsState"
import { FilledState } from "../states/FilledState"
import { FootPrintState } from "../states/FootPrintState"

type Props = {
    cell: Cell
    x: number
    y: number
    cellSize: number
}
export default function CellElement(props: Props) {
    const footPrint = useRecoilValue(FootPrintState)
    const filled = useRecoilValue(FilledState)
    const dots = useRecoilValue(DotsState)

    const foot = footPrint.Hit(props.cell.Point)
    const dot = dots.Hit(props.cell.Point)
    let color: string
    if (props.cell.State === "wall") {
        color = "green"
    } else if (foot) {
        if (filled) {
            color = "#FFFF33"
        } else {
            color = "#CCCC00"
        }
    } else {
        color = "black"
    }

    return (<g>
        <rect
            x={props.x}
            y={props.y}
            width={props.cellSize}
            height={props.cellSize}
            fill={color}
            stroke="black"></rect>
        {dot && <circle cx={props.x + props.cellSize / 2} cy={props.y + props.cellSize / 2} r={props.cellSize / 5} fill="white"></circle>}
    </g>)
}