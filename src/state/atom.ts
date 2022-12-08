import { atom } from "recoil";

export const listaDeParticipantes = atom<string[]>({
  key: "listaDeParticipantes",
  default: [],
});

export const erro = atom<string>({
  key: "erro",
  default: "",
});

export const resultadoDoAmigoSecreto = atom<Map<string, string>>({
  key: "resultadoDoAmigoSecreto",
  default: new Map()
})
