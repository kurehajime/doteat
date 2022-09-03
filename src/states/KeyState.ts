import { atom } from "recoil";

export const KeyState = atom<string | null>({
    key: 'KeyState',
    default: null
});