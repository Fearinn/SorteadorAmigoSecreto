import shuffle from "just-shuffle";

const realizarSorteio = (participantes: string[]) => {
    const resultado = new Map<string, string>();

    const participantesEmbaralhos = shuffle(participantes);

    participantesEmbaralhos.forEach((participante, index) => {
      let indiceDoAmigo = index + 1

      if (index === participantes.length - 1) {
        indiceDoAmigo = 0
      } 
      
      resultado.set(
        participantesEmbaralhos[index],
        participantesEmbaralhos[indiceDoAmigo]
      );
    });

    return resultado
}

export default realizarSorteio