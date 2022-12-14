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
import { PlayerMiliPointState } from "../states/PlayerMiliPointState";
import { TimeState } from "../states/TimeState";
import { useKey } from 'react-use';
import { EnemyBlueState } from "../states/EnemyBlueState";
import { EnemyOrangeState } from "../states/EnemyOrangeState";
import { EnemyPinkState } from "../states/EnemyPinkState";
import { ScoreState } from "../states/ScoreState";
import { Direction } from "../models/Types";
import { Point } from "../models/Point";
type Props = {
    cellSize: number
}
export default function LoopController(props: Props) {
    const [enemyRed, setEnemyRed] = useRecoilState(EnemyRedState);
    const [enemyBlue, setEnemyBlue] = useRecoilState(EnemyBlueState);
    const [enemyPink, setEnemyPink] = useRecoilState(EnemyPinkState);
    const [enemyOrange, setEnemyOrange] = useRecoilState(EnemyOrangeState);
    const [playerMiliPoint, setPlayerMiliPoint] = useRecoilState(PlayerMiliPointState);
    const time = useRecoilValue(TimeState)
    const field = useRecoilValue(FieldState);
    const [key, setKey] = useRecoilState(KeyState)
    const [playerInertia, setPlayerInertia] = useRecoilState(PlayerInertiaState)
    const [footPrint, setFootPrint] = useRecoilState(FootPrintState)
    const [filled, setFilled] = useRecoilState(FilledState)
    const [dots, setDots] = useRecoilState(DotsState)
    const [score, setScore] = useRecoilState(ScoreState)
    const [enemyMode, setEnemyMode] = useRecoilState(EnemyModeState)
    const playerPoint = { x: Math.round(playerMiliPoint.x / props.cellSize), y: Math.round(playerMiliPoint.y / props.cellSize) }

    const enemyRedMove = () => {
        if (field && time % 9 === 0) {
            setEnemyRed(enemyRed.next(field, playerPoint, dots))
        }
    }
    const enemyBlueMove = () => {
        if (field && time % 7 === 0) {
            setEnemyBlue(enemyBlue.next(field, playerPoint, dots))
        }
    }
    const enemyPinkMove = () => {
        if (field && time % 10 === 0) {
            setEnemyPink(enemyPink.next(field, playerPoint, dots))
        }
    }
    const enemyOrangeMove = () => {
        if (field && time % 9 === 0) {
            setEnemyOrange(enemyOrange.next(field, playerPoint, dots))
        }
    }

    const player = () => {
        if (field && time % 3 === 0) {
            const keyNext = key ? field.GetNext(playerPoint, key) : [null, "none"] as [Point | null, Direction]
            const inertiaNext = playerInertia ? field.GetNext(playerPoint, playerInertia) : [null, "none"] as [Point | null, Direction]
            let next = playerPoint
            let move = false
            setFootPrint(footPrint.Add(playerPoint))
            if (keyNext[0]) {
                next = { x: playerMiliPoint.x + keyNext[0].x * (props.cellSize / 3), y: playerMiliPoint.y + keyNext[0].y * (props.cellSize / 3) }
                setPlayerMiliPoint(next)
                setPlayerInertia(key)
                move = true
            } else if (inertiaNext[0]) {
                next = { x: playerMiliPoint.x + inertiaNext[0].x * (props.cellSize / 3), y: playerMiliPoint.y + inertiaNext[0].y * (props.cellSize / 3) }
                setPlayerMiliPoint(next)
                move = true
            } else if (keyNext[1] === "left" || inertiaNext[1] === "left") {
                next = { x: 0, y: playerMiliPoint.y }
                setPlayerMiliPoint(next)
                move = true
            } else if (keyNext[1] === "right" || inertiaNext[1] === "right") {
                next = { x: field.Width * props.cellSize, y: playerMiliPoint.y }
                setPlayerMiliPoint(next)
                move = true
            }
            const nextPoint = { x: Math.round(next.x / props.cellSize), y: Math.round(next.y / props.cellSize) }
            if (move && (nextPoint.x !== playerPoint.x || nextPoint.y !== playerPoint.y)) {
                eat()
            }
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
            if (footPrint.Hit(enemyBlue.point)) {
                setEnemyBlue(enemyBlue.setPoint({ x: 15, y: 14 }))
            }
            if (footPrint.Hit(enemyPink.point)) {
                setEnemyPink(enemyPink.setPoint({ x: 14, y: 15 }))
            }
            if (footPrint.Hit(enemyOrange.point)) {
                setEnemyOrange(enemyOrange.setPoint({ x: 14, y: 14 }))
            }
            setFilled(false)
            setFootPrint(footPrint.Clear())
        }
    }
    const checkGameOver = () => {
        if (enemyRed.point.x === playerPoint.x && enemyRed.point.y === playerPoint.y ||
            enemyBlue.point.x === playerPoint.x && enemyBlue.point.y === playerPoint.y ||
            enemyPink.point.x === playerPoint.x && enemyPink.point.y === playerPoint.y ||
            enemyOrange.point.x === playerPoint.x && enemyOrange.point.y === playerPoint.y ||
            score < 0) {
            setPlayerMiliPoint({ x: 15 * props.cellSize, y: 15 * props.cellSize })
        }
    }
    const eat = () => {
        const newDots = dots.Eat(playerPoint)
        setDots(newDots[1])
        if (newDots[0]) {
            setScore(score => score + 1)
        } else {
            setScore(score => score - 1)
        }

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
        enemyBlueMove()
        enemyPinkMove()
        enemyOrangeMove()
        player()
        modeChange()
        return () => { return }
    }, [time])

    return <></>
}