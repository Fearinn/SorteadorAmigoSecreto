import { useListaDeParticipantes } from "./useListaDeParticipantes";
import useMensagemDeErro from "./useMensagemDeErro";

const useAdicionarParticipante = () => {
  const [listaAtual, setListaDeParticipantes] = useListaDeParticipantes();

  const [, setErro] = useMensagemDeErro();

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
