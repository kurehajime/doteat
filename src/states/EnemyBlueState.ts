import { atom } from "recoil";
import { Enemy } from "../models/Enemy";

export const EnemyBlueState = atom<Enemy>({
    key: 'EnemyBlueState',
    default: new Enemy({ x: 0, y: 0 }, "none")
});
