
import realizarSorteio from "../helpers/realizarSorteio";
import {useListaDeParticipantes} from "./useListaDeParticipantes";
import { useResultadoDoSorteio } from "./useResultadoDoSorteio";
import { useIdsDosParticipantes } from "./useIdsDosParticipantes"


export const useSorteador = () => {
  const [participantes] = useListaDeParticipantes();
  const [,setResultado] = useResultadoDoSorteio();
  const [,setIdsDosParticipantes] = useIdsDosParticipantes()

  return () => {
    const maps = realizarSorteio(participantes)
    setResultado(maps[0]);
    setIdsDosParticipantes(maps[1]);
  };
};



