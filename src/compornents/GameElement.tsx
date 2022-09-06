import React from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { FieldState } from "../states/FieldState"
import { TargetPointState } from "../states/TargetPointState"
import EnemyElement from "./EnemyElement"
import FieldElement from "./FieldElement"
import PlayerElement from "./PlayerElement"
import ScoreElement from "./ScoreElement"

type Props = {
    cellSize: number
}
export default function GameElement(props: Props) {
    const field = useRecoilValue(FieldState)
    const setTargetPoint = useSetRecoilState(TargetPointState);


    const mouseClick = (e: React.PointerEvent<SVGSVGElement>) => {
        const x = e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY

        setTargetPoint({ x: Math.floor(x / props.cellSize), y: Math.floor(y / props.cellSize) })
        e.preventDefault()
    }


    if (field) {
        return (
            <div>
                <svg
                    width={field.Width * props.cellSize}
                    height={field.Width * props.cellSize}
                    onClick={mouseClick}
                >
                    <FieldElement
                        cellSize={props.cellSize
                        }
                    ></FieldElement >
                    {/* <TargetElement
                        cellSize={props.cellSize} /> */}
                    <EnemyElement
                        character="red"
                        cellSize={props.cellSize} />
                    <EnemyElement
                        character="blue"
                        cellSize={props.cellSize} />
                    <EnemyElement
                        character="pink"
                        cellSize={props.cellSize} />
                    <EnemyElement
                        character="orange"
                        cellSize={props.cellSize} />
                    <PlayerElement
                        cellSize={props.cellSize} />
                </svg>
                <ScoreElement cellSize={props.cellSize} />
            </div>
        )
    } else {
        return <></>
    }
}