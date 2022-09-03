import { atom } from "recoil";

export const PlayerInertiaState = atom<string | null>({
    key: 'PlayerInertiaState',
    default: null
});