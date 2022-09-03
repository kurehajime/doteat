import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Astar } from "../logics/Astar";
import { Point } from "../models/Point";
import { EnemyPointState } from "../states/EnemyPointState";
import { FieldState } from "../states/FieldState";
import { KeyState } from "../states/KeyState";
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

    useEffect(() => {
        if (field) {
            const path = Astar.findPath(field, enemyPoint, targetPoint)
            if (path.length > 0) {
                setEnemyPoint(path[0])
            }
            let next: Point | null = null;

            if (key) {
                switch (key) {
                    case "ArrowUp":
                        next = { x: playerPoint.x, y: playerPoint.y - 1 }
                        break;
                    case "ArrowDown":
                        next = { x: playerPoint.x, y: playerPoint.y + 1 }
                        break;
                    case "ArrowLeft":
                        next = { x: playerPoint.x - 1, y: playerPoint.y }
                        break;
                    case "ArrowRight":
                        next = { x: playerPoint.x + 1, y: playerPoint.y }
                        break;
                }
                if (next && field.IsWalkable(next)) {
                    setPlayerPoint(next)
                }
                setKey(null)
            }
        }

        return () => { return }
    }, [time])

    return <></>
}