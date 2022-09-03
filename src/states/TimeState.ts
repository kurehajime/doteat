import { atom } from "recoil";

export const TimeState = atom<number>({
    key: 'TimeState',
    default: 0
});