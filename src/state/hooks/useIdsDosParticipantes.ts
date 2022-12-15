import { useRecoilState } from "recoil"
import { idsDosParticipantes} from "../atom"

export const useIdsDosParticipantes = () => {
    return useRecoilState(idsDosParticipantes)
}