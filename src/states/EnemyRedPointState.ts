import { atom } from "recoil";
import { Point } from "../models/Point";

export const EnemyRedPointState = atom<Point>({
    key: 'EnemyRedPointState',
    default: { x: 0, y: 0 }
});
