import { v4 as uuidv4 } from "uuid";

export const geraIdParticipante = () => {
  const idParticipante = uuidv4();
  return idParticipante
};
