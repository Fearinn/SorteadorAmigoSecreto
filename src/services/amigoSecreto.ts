import { supabase } from "./supabaseClient";

export const sorteioService = (identificador: string, idParticipante: string) => {
  return {
    getResultado: () => {
      return supabase
        .from("amigosSecretos")
        .select(
          `participantes, resultado->${idParticipante}`
        )
        .eq("identificador", identificador);
    },
  };
};

