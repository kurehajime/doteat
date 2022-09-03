import { atom } from "recoil";

export const InitState = atom<boolean>({
    key: 'InitState',
    default: false
});