import { time } from "console";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useTimer } from "use-timer";
import { InitState } from "../states/InitState";
import { TimeState } from "../states/TimeState";

export default function TimeController() {
    const init = useRecoilValue(InitState)

    const { time: _time, start } = useTimer({ interval: 30 });
    const setTime = useSetRecoilState(TimeState)

    useEffect(() => {
        if (init) {
            start();
        }
    }, [init])

    useEffect(() => {
        if (init) {
            setTime(_time)
        }
        return () => { return }
    }, [_time])


    return <></>
}