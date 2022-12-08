import { useRecoilValue } from "recoil"
import { erro } from "../atom"

const useMensagemDeErro = () => {
    const mensagemDeErro = useRecoilValue(erro)
    return mensagemDeErro
}

export default useMensagemDeErro