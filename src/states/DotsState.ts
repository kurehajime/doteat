import { atom } from "recoil";
import { Dots } from "../models/Dots";

export const DotsState = atom<Dots>({
    key: 'DotsState',
    default: new Dots()
});