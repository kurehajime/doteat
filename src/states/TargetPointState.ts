import { atom } from "recoil";
import { Point } from "../models/Point";

export const TargetPointState = atom<Point>({
    key: 'TargetPointState',
    default: { x: 0, y: 0 }
});
