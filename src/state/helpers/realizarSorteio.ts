import shuffle from "just-shuffle";
import { geraIdParticipante } from "../../utils/idParticipante";

const realizarSorteio = (participantes: string[]) => {
    const resultado = new Map<string, string>();

    const atribuicaoDeIds = new Map<string, string>()

    const participantesEmbaralhos = shuffle(participantes);

    participantesEmbaralhos.forEach((participante, index) => {
      let indiceDoAmigo = index + 1

      if (index === participantes.length - 1) {
        indiceDoAmigo = 0
      } 
      
      resultado.set(
        participante,
        participantesEmbaralhos[indiceDoAmigo]
      );

    });

    participantesEmbaralhos.forEach((participante) => {
      atribuicaoDeIds.set(participante, geraIdParticipante())
    })

    return [resultado, atribuicaoDeIds]
}

export default realizarSorteio