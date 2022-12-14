import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes";
import { useSorteador } from "../../state/hooks/useSorteador";
import { createClient } from "@supabase/supabase-js";
import { useIdentificadorDoSorteio } from "../../state/hooks/useIdentificadorDoSorteio";
import styles from "./Rodape.module.scss";
import useMensagemDeErro from "../../state/hooks/useMensagemDeErro";
import { useResultadoDoSorteio } from "../../state/hooks/useResultadoDoSorteio";
import { useEffect, useRef } from "react";

const PROJECT_URL = "https://xhexdnrmtpfyntwordms.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZXhkbnJtdHBmeW50d29yZG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA4OTAwNjgsImV4cCI6MTk4NjQ2NjA2OH0.d4R_zi0E03ARxGIgolk7yrSURk1XuoRarLF_2dXPpAI";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

const Rodape = () => {
  const participantes = useListaDeParticipantes();
  const [, setMensagem] = useMensagemDeErro();
  const [identificador, setIdentificador] = useIdentificadorDoSorteio();
  const [resultado] = useResultadoDoSorteio();
  const estaMontado = useRef(false);
  const sortear = useSorteador();

  async function enviaDados() {
    try {
      const registration = await supabase.from("amigosSecretos").insert({
        participantes: participantes,
        identificador: identificador,
        resultado: Object.fromEntries(resultado),
      });

      if (registration.status === 201) {
        setMensagem(
          `Seu sorteio foi salvo! Copie "${window.location.href}sorteio/${identificador}", adicione o nome do participante no final e envie-lhe, para que ele descubra o amigo secreto dele.`
        );
        setIdentificador("");
      }

      if (registration.error) {
        setIdentificador("");
        throw new Error(
          `Houve um problema ao salvar seu sorteio. Por favor mude o identificador e tente novamente.`
        );
      }
    } catch (error) {
      setMensagem(`${error}`);
      setTimeout(() => {
        setMensagem("");
      }, 5000);
    }
  }

  useEffect(() => {
    if (estaMontado.current) {
      enviaDados();
    } else {
      estaMontado.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultado]);

  return (
    <footer className={styles.rodape}>
      <button
        className={styles.botao}
        onClick={sortear}
        disabled={participantes?.length < 3 || !identificador}
      >
        Iniciar brincadeira
      </button>
      <div className={styles.imagem} />
    </footer>
  );
};

export default Rodape;
