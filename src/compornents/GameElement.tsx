import React, { useEffect } from "react"
import { Utils } from "../logics/Utils"
import { Field } from "../models/Field"
import FieldElement from "./FieldElement"

type Props = {
    cellSize: number
}
export default function GameElement(props: Props) {
    const [field, setField] = React.useState<Field>()

    useEffect(() => {
        const cells =
            [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 1, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 1, 0],
            ]
        const [map] = Utils.MakeMap(cells)
        setField(map)
    }, [])

    if (field) {
        return (
            <svg
                width={field.Width * props.cellSize}
                height={field.Width * props.cellSize}
            >
                <FieldElement
                    cellSize={props.cellSize
                    }
                    field={field}
                ></FieldElement >
            </svg>)
    } else {
        return <></>
    }

}