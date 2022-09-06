import { atom } from "recoil";
import { Enemy } from "../models/Enemy";

export const EnemyOrangeState = atom<Enemy>({
    key: 'EnemyOrangeState',
    default: new Enemy({ x: 0, y: 0 }, "none")
});
