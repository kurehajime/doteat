import { useRecoilValue } from "recoil"
import { ScoreState } from "../states/ScoreState"

type Props = {
    cellSize: number
}
export default function ScoreElement(props: Props) {
    const score = useRecoilValue(ScoreState)
    return (<div>
        {score}
    </div>)
}