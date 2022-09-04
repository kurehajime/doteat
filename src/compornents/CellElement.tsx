import { useRecoilValue } from "recoil"
import { Cell } from "../models/Cell"
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

    const foot = footPrint.Hit(props.cell.Point)
    let color: string
    if (props.cell.State === "wall") {
        color = "green"
    } else if (foot) {
        if (filled) {
            color = "#FFFF33"
        } else {
            color = "#FFFF66"
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
    </g>)
}