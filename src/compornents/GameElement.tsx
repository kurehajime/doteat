import React, { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Utils } from "../logics/Utils"
import { Field } from "../models/Field"
import { fieldState } from "../states/fieldState"
import { targetPointState } from "../states/targetPointState"
import EnemyElement from "./EnemyElement"
import FieldElement from "./FieldElement"
import TargetElement from "./TargetElement"

type Props = {
    cellSize: number
}
export default function GameElement(props: Props) {
    const field = useRecoilValue(fieldState)
    const setTargetPoint = useSetRecoilState(targetPointState);

    const mouseClick = (e: React.PointerEvent<SVGSVGElement>) => {
        const x = e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY

        setTargetPoint({ x: Math.floor(x / props.cellSize), y: Math.floor(y / props.cellSize) })
        e.preventDefault()
    }
    if (field) {
        return (
            <svg
                width={field.Width * props.cellSize}
                height={field.Width * props.cellSize}
                onClick={mouseClick}
            >
                <FieldElement
                    cellSize={props.cellSize
                    }
                    field={field}
                ></FieldElement >
                <TargetElement
                    cellSize={props.cellSize} />
                <EnemyElement
                    cellSize={props.cellSize} />
            </svg>)
    } else {
        return <></>
    }
}