import { atom } from "recoil";
import { EnemyMode } from "../models/Types";

export const EnemyModeState = atom<EnemyMode>({
    key: 'EnemyModeState',
    default: "normal"
});