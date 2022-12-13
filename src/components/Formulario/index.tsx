import React, { useRef, useState } from "react";
import useAdicionarParticipante from "../../state/hooks/useAdicionarParticipante";
import { useIdentificadorDoSorteio } from "../../state/hooks/useIdentificadorDoSorteio";
import useMensagemDeErro from "../../state/hooks/useMensagemDeErro";
import styles from "./Formulario.module.scss";

const Formulario = () => {
  const [nome, setNome] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [mensagem] = useMensagemDeErro();

  const [, setIdentificadorSalvo] = useIdentificadorDoSorteio();

  const inputRef = useRef<HTMLInputElement>(null);

  const adicionarNaLista = useAdicionarParticipante();

  async function controlaForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
  }

  return (
    <form className={styles.formulario} onSubmit={controlaForm}>
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
        <button
          className={styles.botao}
          type="button"
          disabled={!nome}
          onClick={() => {
            adicionarNaLista(nome);
            setNome("");
            inputRef.current?.focus();
          }}
        >
          Adicionar
        </button>
        <input
          required
          className={styles.input}
          type="text"
          value={identificador}
          placeholder="Defina uma senha para seu jogo"
          onChange={(evento) => {
            setIdentificador(evento.target.value);
          }}
        />
        <button
          type="button"
          className={styles.botao}
          disabled={!identificador}
          onClick={() => setIdentificadorSalvo(identificador)}
        >
          Salvar
        </button>
      </div>
      {mensagem && (
        <p role="alert" className={styles.erro}>
          {mensagem}
        </p>
      )}
    </form>
  );
};

export default Formulario;
