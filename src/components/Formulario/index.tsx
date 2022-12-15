import React, { useEffect, useRef, useState } from "react";
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

  function controlaForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    adicionarNaLista(nome.toLowerCase());
    setNome("");
    inputRef.current?.focus();
  }

  useEffect(
    () => {
      const identificadorFormatado = identificador
        .toLowerCase()
        .replace(/\s/g, "");
      setIdentificadorSalvo(identificadorFormatado);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [identificador]
  );

  return (
    <form className={styles.formulario} onSubmit={controlaForm}>
      <h1 className={styles.titulo}>Vamos começar!</h1>
      <fieldset className={styles.fieldset}>
        <div className={styles.container}>
          <input
            required
            className={styles.input}
            ref={inputRef}
            type="text"
            value={nome}
            placeholder="Insira os nomes dos participantes. Pelo menos 3 são necessários para brincar."
            onChange={(evento) => setNome(evento.target.value)}
          />
          <button className={styles.botao} type="submit" disabled={!nome}>
            Adicionar
          </button>
        </div>
        <input
          className={styles.input}
          type="text"
          value={identificador}
          placeholder="Defina uma palavra para identificar seu jogo. Ex.: familiasilva123"
          onChange={(evento) => {
            setIdentificador(evento.target.value);
          }}
        />
      </fieldset>
      {mensagem && (
        <p role="alert" className={styles.erro}>
          {mensagem}
        </p>
      )}
    </form>
  );
};

export default Formulario;
