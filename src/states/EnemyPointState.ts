import { atom } from "recoil";
import { Point } from "../models/Point";

export const EnemyPointState = atom<Point>({
    key: 'EnemyPointState',
    default: { x: 0, y: 0 }
});