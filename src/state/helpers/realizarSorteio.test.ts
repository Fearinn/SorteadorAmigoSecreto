
import realizarSorteio from "./realizarSorteio";

describe("dado um sorteio", () => {
  test("participantes não podem sortear o próprio nome", () => {
    const participantes = ["Vivih", "Matheus", "Isa", "Rosimar", "Rudinei"];

    const sorteio = realizarSorteio(participantes);

    participantes.forEach(participante => {
        const amigoSecreto = sorteio[0].get(participante)
        expect(amigoSecreto).not.toEqual(participante)
    })
  });
});
