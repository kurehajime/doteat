import { atom } from "recoil";

export const FilledState = atom<boolean>({
    key: 'FilledState',
    default: false
});