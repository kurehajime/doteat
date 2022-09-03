import React from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { FieldState } from "../states/FieldState"
import { KeyState } from "../states/KeyState"
import { TargetPointState } from "../states/TargetPointState"
import EnemyElement from "./EnemyElement"
import FieldElement from "./FieldElement"
import PlayerElement from "./PlayerElement"
import TargetElement from "./TargetElement"
import { useKey } from 'react-use';

type Props = {
    cellSize: number
}
export default function GameElement(props: Props) {
    const field = useRecoilValue(FieldState)
    const setTargetPoint = useSetRecoilState(TargetPointState);
    const setKey = useSetRecoilState(KeyState)


    const mouseClick = (e: React.PointerEvent<SVGSVGElement>) => {
        const x = e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY

        setTargetPoint({ x: Math.floor(x / props.cellSize), y: Math.floor(y / props.cellSize) })
        e.preventDefault()
    }

    const ArrowDown = () => setKey('ArrowDown');
    const ArrowUp = () => setKey('ArrowUp');
    const ArrowLeft = () => setKey('ArrowLeft');
    const ArrowRight = () => setKey('ArrowRight');
    useKey('ArrowDown', ArrowDown);
    useKey('ArrowUp', ArrowUp);
    useKey('ArrowLeft', ArrowLeft);
    useKey('ArrowRight', ArrowRight);

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
                    <TargetElement
                        cellSize={props.cellSize} />
                    <EnemyElement
                        cellSize={props.cellSize} />
                    <PlayerElement
                        cellSize={props.cellSize} />
                </svg>
            </div>
        )
    } else {
        return <></>
    }
}