import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Utils } from "../logics/Utils";
import { EnemyPointState } from "../states/EnemyPointState";
import { FieldState } from "../states/FieldState";
import { InitState } from "../states/InitState";
import { TargetPointState } from "../states/TargetPointState";

export default function InitController() {
    const setEnemyPoint = useSetRecoilState(EnemyPointState);
    const setTargetPoint = useSetRecoilState(TargetPointState);
    const setField = useSetRecoilState(FieldState);
    const [init, setInit] = useRecoilState(InitState)

    useEffect(() => {
        if (!init) {
            setInit(true)
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
        }
    }, [init])

    return <></>
}