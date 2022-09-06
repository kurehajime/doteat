import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Utils } from "../logics/Utils";
import { Enemy } from "../models/Enemy";
import { DotsState } from "../states/DotsState";
import { EnemyBlueState } from "../states/EnemyBlueState";
import { EnemyOrangeState } from "../states/EnemyOrangeState";
import { EnemyPinkState } from "../states/EnemyPinkState";
import { EnemyRedState } from "../states/EnemyRedState";
import { FieldState } from "../states/FieldState";
import { InitState } from "../states/InitState";
import { PlayerMiliPointState } from "../states/PlayerMiliPointState";
import { TargetPointState } from "../states/TargetPointState";
type Props = {
    cellSize: number
}
export default function InitController(props: Props) {
    const setEnemyRed = useSetRecoilState(EnemyRedState);
    const setEnemyBlue = useSetRecoilState(EnemyBlueState);
    const setEnemyPink = useSetRecoilState(EnemyPinkState);
    const setEnemyOrange = useSetRecoilState(EnemyOrangeState);
    const setMiliPlayerPoint = useSetRecoilState(PlayerMiliPointState);
    const setTargetPoint = useSetRecoilState(TargetPointState);
    const setField = useSetRecoilState(FieldState);
    const setDots = useSetRecoilState(DotsState)
    const [init, setInit] = useRecoilState(InitState)

    useEffect(() => {
        if (!init) {
            setInit(true)
            const cells =
                [
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                    [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
                    [1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 2, 1, 0, 1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1],
                    [1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 2, 1, 0, 1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1],
                    [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
                    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                    [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
                    [1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1],
                    [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
                    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
                    [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                    [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                    [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
                    [1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1],
                    [1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                    [1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
                    [1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1],
                    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 1, 1, 2, 1, 1, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
                    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                ]
            const [map, dots] = Utils.MakeMap(cells)
            setField(map)
            setDots(dots)
            setEnemyRed(new Enemy({ x: 1, y: 1 }, "red"))
            setEnemyBlue(new Enemy({ x: 29, y: 1 }, "blue"))
            setEnemyPink(new Enemy({ x: 1, y: 29 }, "pink"))
            setEnemyOrange(new Enemy({ x: 29, y: 29 }, "orange"))
            setMiliPlayerPoint({ x: 10 * props.cellSize, y: 10 * props.cellSize })
            setTargetPoint({ x: 25, y: 25 })
        }
    }, [init])

    return <></>
}