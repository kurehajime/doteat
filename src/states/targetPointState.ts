import { atom } from "recoil";
import { Point } from "../models/Point";

export const targetPointState = atom<Point>({
    key: 'targetPointState',
    default: { x: 0, y: 0 }
});