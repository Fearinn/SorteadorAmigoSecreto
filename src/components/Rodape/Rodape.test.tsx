import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import {useListaDeParticipantes} from "../../state/hooks/useListaDeParticipantes";
import Rodape from ".";

const mockNavegacao = jest.fn();
const mockSorteio = jest.fn()

jest.mock("../../state/hooks/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
});

jest.mock("react-router-dom", () => {
  return {
    useNavigate: () => mockNavegacao,
  };
});

jest.mock("../../state/hooks/useSorteador.ts", () => {
  return {
    useSorteador: () => mockSorteio,
  };
});

describe("não há participantes suficientes", () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });
  test("o jogo não pode ser iniciado", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button");

    expect(botao).toBeDisabled();
  });
});

describe("há participantes suficientes", () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([
      "Vivih",
      "Isa",
      "Matheus",
    ]);
  });
  test("a brincadeira pode ser iniciada", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button");

    expect(botao).not.toBeDisabled();
  });

  test("a brincadeira foi iniciada", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button")

    fireEvent.click(botao)
    expect(mockNavegacao).toHaveBeenCalledWith("/sorteio")
    expect(mockSorteio).toHaveBeenCalledTimes(1)
  });
});
