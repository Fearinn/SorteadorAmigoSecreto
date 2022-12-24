import { useRecoilState } from "recoil"
import { listaDeParticipantes } from "../atom"

export const useListaDeParticipantes = () => {
    return useRecoilState(listaDeParticipantes)
}

