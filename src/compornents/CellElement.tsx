import { Cell } from "../models/Cell"

type Props = {
    cell: Cell
    x: number
    y: number
    cellSize: number
}
export default function CellElement(props: Props) {
    return (<g>
        <rect
            x={props.x}
            y={props.y}
            width={props.cellSize}
            height={props.cellSize}
            fill={props.cell.State === "wall" ? "black" : "white"}
            stroke="black"></rect>
    </g>)
}