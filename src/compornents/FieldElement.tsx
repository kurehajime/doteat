import { Field } from "../models/Field"
import CellElement from "./CellElement"

type Props = {
    cellSize: number
    field: Field
}
export default function FieldElement(props: Props) {
    return (<g>
        {
            props.field.Cells.map((cell, index) => {
                const x = index % props.field.Width
                const y = Math.floor(index / props.field.Width)
                return <CellElement
                    key={index}
                    cell={cell}
                    x={x * props.cellSize}
                    y={y * props.cellSize}
                    cellSize={props.cellSize}
                ></CellElement>
            })
        }
    </g>)
}