import { useRecoilValue } from "recoil"
import { Cell } from "../models/Cell"
import { FootPrintState } from "../states/FootPrintState"

type Props = {
    cell: Cell
    x: number
    y: number
    cellSize: number
}
export default function CellElement(props: Props) {
    const footPrint = useRecoilValue(FootPrintState)
    const foot = footPrint.Hit(props.cell.Point)
    const color = props.cell.State === "wall" ? "green" : foot ? "#FFFF66" : "black"
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