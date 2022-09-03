import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Astar } from "../logics/Astar";
import { EnemyPointState } from "../states/EnemyPointState";
import { FieldState } from "../states/FieldState";
import { TargetPointState } from "../states/TargetPointState";
import { TimeState } from "../states/TimeState";


export default function LoopController() {
    const [enemyPoint, setEnemyPoint] = useRecoilState(EnemyPointState);
    const targetPoint = useRecoilValue(TargetPointState);
    const time = useRecoilValue(TimeState)
    const field = useRecoilValue(FieldState);

    useEffect(() => {
        if (field) {
            const path = Astar.findPath(field, enemyPoint, targetPoint)
            if (path.length > 0) {
                setEnemyPoint(path[0])
            }
        }

        return () => { return }
    }, [time])

    return <></>
}