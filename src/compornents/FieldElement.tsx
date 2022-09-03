import { useRecoilValue } from "recoil"
import { FieldState } from "../states/FieldState"
import CellElement from "./CellElement"

type Props = {
    cellSize: number
}
export default function FieldElement(props: Props) {
    const field = useRecoilValue(FieldState)

    return (<g>
        {
            field?.Cells.map((cell, index) => {
                const x = index % field.Width
                const y = Math.floor(index / field.Width)
                return (<CellElement
                    key={index}
                    cell={cell}
                    x={x * props.cellSize}
                    y={y * props.cellSize}
                    cellSize={props.cellSize}
                ></CellElement>)
            })
        }
    </g>)
}