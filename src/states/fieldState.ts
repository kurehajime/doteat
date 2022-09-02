import { atom } from "recoil";
import { Field } from "../models/Field";

export const fieldState = atom<Field | null>({
    key: 'fieldState',
    default: null
});