import { atom } from "recoil";
import { Enemy } from "../models/Enemy";

export const EnemyPinkState = atom<Enemy>({
    key: 'EnemyPinkState',
    default: new Enemy({ x: 0, y: 0 }, "none")
});
