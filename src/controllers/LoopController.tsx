import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Astar } from "../logics/Astar";
import { Dots } from "../models/Dots";
import { DotsState } from "../states/DotsState";
import { EnemyPointState } from "../states/EnemyPointState";
import { FieldState } from "../states/FieldState";
import { FilledState } from "../states/FilledState";
import { FootPrintState } from "../states/FootPrintState";
import { KeyState } from "../states/KeyState";
import { PlayerInertiaState } from "../states/PlayerInertiaState";
import { PlayerPointState } from "../states/PlayerPointState";
import { TimeState } from "../states/TimeState";


export default function LoopController() {
    const [enemyPoint, setEnemyPoint] = useRecoilState(EnemyPointState);
    const [playerPoint, setPlayerPoint] = useRecoilState(PlayerPointState);
    const time = useRecoilValue(TimeState)
    const field = useRecoilValue(FieldState);
    const [key] = useRecoilState(KeyState)
    const [playerInertia, setPlayerInertia] = useRecoilState(PlayerInertiaState)
    const [footPrint, setFootPrint] = useRecoilState(FootPrintState)
    const [filled, setFilled] = useRecoilState(FilledState)
    const [dots, setDots] = useRecoilState(DotsState)

    const enemy = () => {
        if (field && time % 9 === 0) {
            const path = Astar.findPath(field, enemyPoint, playerPoint)
            if (path.length > 0) {
                setEnemyPoint(path[0])
            }
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
            if (footPrint.Hit(enemyPoint)) {
                setEnemyPoint({ x: 15, y: 15 })
            }
            setFilled(false)
            setFootPrint(footPrint.Clear())
        }
    }
    const checkGameOver = () => {
        if (enemyPoint.x === playerPoint.x && enemyPoint.y === playerPoint.y) {
            setPlayerPoint({ x: 15, y: 15 })
        }
    }
    const eat = () => {
        const newDots = dots.Eat(playerPoint)
        setDots(newDots[1])
    }


    useEffect(() => {
        enemy()
        player()

        return () => { return }
    }, [time])

    return <></>
}