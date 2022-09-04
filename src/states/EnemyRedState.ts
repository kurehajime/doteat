import { atom } from "recoil";
import { Enemy } from "../models/Enemy";

export const EnemyRedState = atom<Enemy>({
    key: 'EnemyRedState',
    default: new Enemy({ x: 0, y: 0 }, "none")
});
