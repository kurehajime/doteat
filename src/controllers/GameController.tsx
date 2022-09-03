import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useTimer } from "use-timer";
import { Astar } from "../logics/Astar";
import { Utils } from "../logics/Utils";
import { EnemyPointState } from "../states/EnemyPointState";
import { FieldState } from "../states/FieldState";
import { TargetPointState } from "../states/TargetPointState";

type Props = {
    cellSize: number
}
export default function GameController(props: Props) {
    const [enemyPoint, setEnemyPoint] = useRecoilState(EnemyPointState);
    const [targetPoint, setTargetPoint] = useRecoilState(TargetPointState);
    const [field, setField] = useRecoilState(FieldState);

    const { time, start } = useTimer({ interval: 100 });
    useEffect(() => {
        const cells =
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
                [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
                [0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
                [0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
                [1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
                [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
                [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
            ]
        const [map] = Utils.MakeMap(cells)
        setField(map)
        setEnemyPoint({ x: 2, y: 2 })
        setTargetPoint({ x: 9, y: 6 })
        start();
    }, [])

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