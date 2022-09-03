import { atom } from "recoil";
import { Field } from "../models/Field";

export const FieldState = atom<Field | null>({
    key: 'FieldState',
    default: null
});
