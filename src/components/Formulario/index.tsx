import React, { useRef, useState } from "react";
import useAdicionarParticipante from "../../state/hooks/useAdicionarParticipante";
import useMensagemDeErro from "../../state/hooks/useMensagemDeErro";
import styles from "./Formulario.module.scss";

const Formulario = () => {
  const [nome, setNome] = useState("");
  const mensagemDeErro = useMensagemDeErro();

  const inputRef = useRef<HTMLInputElement>(null);

  const adicionarNaLista = useAdicionarParticipante();

  function adicionarParticipante(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    adicionarNaLista(nome);
    setNome("");
    inputRef.current?.focus();
  }

  return (
    <form className={styles.formulario} onSubmit={adicionarParticipante}>
      <h1 className={styles.titulo}>Vamos começar!</h1>
      <div className={styles.container}>
        <input
          className={styles.input}
          ref={inputRef}
          type="text"
          value={nome}
          placeholder="Insira os nomes dos participantes"
          onChange={(evento) => setNome(evento.target.value)}
        />
        <button className={styles.botao} disabled={!nome}>
          Adicionar
        </button>
       
      </div>
      {mensagemDeErro && <p role="alert" className={styles.erro}>{mensagemDeErro}</p>}
    </form>
  );
};

export default Formulario;
