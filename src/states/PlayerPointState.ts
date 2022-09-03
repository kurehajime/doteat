import { atom } from "recoil";
import { Point } from "../models/Point";

export const PlayerPointState = atom<Point>({
    key: 'PlayerPointState',
    default: { x: 0, y: 0 }
});