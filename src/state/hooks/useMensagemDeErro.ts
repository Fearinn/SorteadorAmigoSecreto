import { useRecoilState} from "recoil"
import { erro } from "../atom"

const useMensagemDeErro = () => {
    const mensagemDeErro = useRecoilState(erro)
    return mensagemDeErro
}

export default useMensagemDeErro