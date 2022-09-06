import { atom } from "recoil";
import { Point } from "../models/Point";

export const PlayerMiliPointState = atom<Point>({
    key: 'PlayerMiliPointState',
    default: { x: 0, y: 0 }
});