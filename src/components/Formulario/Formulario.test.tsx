import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { RecoilRoot } from "recoil";
import Formulario from ".";

// Jest

describe("Comportamento do formulário", () => {
  test("quando o input está vazio, novos participantes não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes. Pelo menos 3 são necessários para brincar."
    );

    const botao = screen.getByRole("button");

    expect(input).toBeInTheDocument();

    expect(botao).toBeDisabled();
  });

  test("adicionar nome de participante caso haja um nome preenchido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes. Pelo menos 3 são necessários para brincar."
    );

    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Viviane",
      },
    });

    fireEvent.click(botao);

    expect(input).toHaveFocus();

    expect(input).toHaveValue("");
  });

  test("nomes duplicados não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes. Pelo menos 3 são necessários para brincar."
    );

    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Viviane",
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Viviane",
      },
    });

    fireEvent.click(botao);

    const mensagemDeErro = screen.getByRole("alert");

    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos!"
    );
  });

  test("A mensagem de erro desaparece após os timers", () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes. Pelo menos 3 são necessários para brincar."
    );

    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Viviane",
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Viviane",
      },
    });

    fireEvent.click(botao);

    let mensagemDeErro = screen.queryByRole("alert");

    expect(mensagemDeErro).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    mensagemDeErro = screen.queryByRole("alert");

    expect(mensagemDeErro).toBeNull();
  });
});
