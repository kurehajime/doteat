import { atom } from "recoil";
import { Point } from "../models/Point";

export const enemyPointState = atom<Point>({
    key: 'enemyPointState',
    default: { x: 0, y: 0 }
});