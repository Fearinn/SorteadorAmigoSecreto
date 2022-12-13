import { useRecoilState } from "recoil"
import { identificadorDoSorteio } from "../atom"

export const useIdentificadorDoSorteio = () => {
    return useRecoilState(identificadorDoSorteio)
}