import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { DotsState } from "../states/DotsState";
import { EnemyModeState } from "../states/EnemyModeState";
import { EnemyRedState } from "../states/EnemyRedState";
import { FieldState } from "../states/FieldState";
import { FilledState } from "../states/FilledState";
import { FootPrintState } from "../states/FootPrintState";
import { KeyState } from "../states/KeyState";
import { PlayerInertiaState } from "../states/PlayerInertiaState";
import { PlayerPointState } from "../states/PlayerPointState";
import { TimeState } from "../states/TimeState";
import { useKey } from 'react-use';

export default function LoopController() {
    const [enemyRed, setEnemyRed] = useRecoilState(EnemyRedState);
    const [playerPoint, setPlayerPoint] = useRecoilState(PlayerPointState);
    const time = useRecoilValue(TimeState)
    const field = useRecoilValue(FieldState);
    const [key, setKey] = useRecoilState(KeyState)
    const [playerInertia, setPlayerInertia] = useRecoilState(PlayerInertiaState)
    const [footPrint, setFootPrint] = useRecoilState(FootPrintState)
    const [filled, setFilled] = useRecoilState(FilledState)
    const [dots, setDots] = useRecoilState(DotsState)
    const [enemyMode, setEnemyMode] = useRecoilState(EnemyModeState)

    const enemyRedMove = () => {
        if (field && time % 9 === 0) {
            setEnemyRed(enemyRed.next(field, playerPoint, dots))
        }
    }

    const player = () => {
        if (field && time % 7 === 0) {
            const keyNext = key ? field.GetNext(playerPoint, key) : null
            const inertiaNext = playerInertia ? field.GetNext(playerPoint, playerInertia) : null
            setFootPrint(footPrint.Add(playerPoint))
            if (keyNext) {
                setPlayerPoint(keyNext)
                setPlayerInertia(key)
            } else if (inertiaNext) {
                setPlayerPoint(inertiaNext)
            }
            eat()
            fill()
            jail()
            checkGameOver()
        }
    }
    const fill = () => {
        if (field) {
            const fillfoot = footPrint.Fill(field.Width)
            if (fillfoot[0] && fillfoot[1]) {
                setFootPrint(fillfoot[1])
                setFilled(true)
            }
        }
    }
    const jail = () => {
        if (filled) {
            if (footPrint.Hit(enemyRed.point)) {
                setEnemyRed(enemyRed.setPoint({ x: 15, y: 15 }))
            }
            setFilled(false)
            setFootPrint(footPrint.Clear())
        }
    }
    const checkGameOver = () => {
        if (enemyRed.point.x === playerPoint.x && enemyRed.point.y === playerPoint.y) {
            setPlayerPoint({ x: 15, y: 15 })
        }
    }
    const eat = () => {
        const newDots = dots.Eat(playerPoint)
        setDots(newDots[1])
    }
    const modeChange = () => {
        if (time % 101 === 0) {
            if (enemyMode === "normal") {
                setEnemyMode("random")
            }
            if (enemyMode === "random") {
                setEnemyMode("normal")
            }
        }
    }

    useKey('ArrowDown', () => { setKey('ArrowDown') });
    useKey('ArrowUp', () => { setKey('ArrowUp') });
    useKey('ArrowLeft', () => { setKey('ArrowLeft') });
    useKey('ArrowRight', () => { setKey('ArrowRight') });

    useEffect(() => {
        enemyRedMove()
        player()
        modeChange()
        return () => { return }
    }, [time])

    return <></>
}