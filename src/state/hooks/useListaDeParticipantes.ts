import { useRecoilValue } from "recoil"
import { listaDeParticipantes } from "../atom"

export const useListaDeParticipantes = () => {
    return useRecoilValue(listaDeParticipantes)
}

