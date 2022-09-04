import { atom } from "recoil";
import { FootPrint } from "../models/FootPrint";

export const FootPrintState = atom<FootPrint>({
    key: 'FootPrintState',
    default: new FootPrint()
});