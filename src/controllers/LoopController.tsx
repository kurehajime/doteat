import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Astar } from "../logics/Astar";
import { Point } from "../models/Point";
import { EnemyPointState } from "../states/EnemyPointState";
import { FieldState } from "../states/FieldState";
import { KeyState } from "../states/KeyState";
import { PlayerInertiaState } from "../states/PlayerInertiaState";
import { PlayerPointState } from "../states/PlayerPointState";
import { TargetPointState } from "../states/TargetPointState";
import { TimeState } from "../states/TimeState";


export default function LoopController() {
    const [enemyPoint, setEnemyPoint] = useRecoilState(EnemyPointState);
    const [playerPoint, setPlayerPoint] = useRecoilState(PlayerPointState);
    const targetPoint = useRecoilValue(TargetPointState);
    const time = useRecoilValue(TimeState)
    const field = useRecoilValue(FieldState);
    const [key, setKey] = useRecoilState(KeyState)
    const [playerInertia, setPlayerInertia] = useRecoilState(PlayerInertiaState)

    useEffect(() => {
        if (field) {
            const path = Astar.findPath(field, enemyPoint, targetPoint)
            if (path.length > 0) {
                setEnemyPoint(path[0])
            }

            const keyNext = key ? field.GetNext(playerPoint, key) : null
            const inertiaNext = playerInertia ? field.GetNext(playerPoint, playerInertia) : null
            if (keyNext) {
                setPlayerPoint(keyNext)
                setPlayerInertia(key)
            } else if (inertiaNext) {
                setPlayerPoint(inertiaNext)
            }
        }

        return () => { return }
    }, [time])

    return <></>
}