import { useRecoilState } from "recoil"
import { resultadoDoAmigoSecreto } from "../atom"

export const useResultadoDoSorteio = () => {
    return useRecoilState(resultadoDoAmigoSecreto)
}

