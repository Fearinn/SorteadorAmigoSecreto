import { useRecoilState } from "recoil"
import { dataResultado } from "../atom"

export const useDataResultado = () => {
    return useRecoilState(dataResultado)
}