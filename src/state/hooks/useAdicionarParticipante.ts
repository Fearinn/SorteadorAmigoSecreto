import { useRecoilValue, useSetRecoilState } from "recoil";
import { erro, listaDeParticipantes } from "../atom";

const useAdicionarParticipante = () => {
  const setListaDeParticipantes =
    useSetRecoilState<string[]>(listaDeParticipantes);

  const listaAtual = useRecoilValue(listaDeParticipantes);

  const setErro = useSetRecoilState(erro);

  return (nomeDoParticipante: string) => {
    if (listaAtual.includes(nomeDoParticipante)) {
      setErro("Nomes duplicados não são permitidos!");
      setTimeout(() => setErro(""), 5000);
    } else {
      return setListaDeParticipantes([...listaAtual, nomeDoParticipante]);
    }
  };
};

export default useAdicionarParticipante;
