import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import {useListaDeParticipantes} from "../../state/hooks/useListaDeParticipantes";
import Rodape from ".";
import { useIdentificadorDoSorteio } from "../../state/hooks/useIdentificadorDoSorteio";

jest.mock("../../state/hooks/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  }
});

jest.mock("../../state/hooks/useIdentificadorDoSorteio", () => {
  return {
    useIdentificadorDoSorteio: jest.fn(),
  }
})

jest.mock("../../state/hooks/useSorteador", () => {
  return {
    useSorteador: () => mockSorteio,
  };
});

const mockSorteio = jest.fn()

describe("não há participantes suficientes", () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([[],]);
    (useIdentificadorDoSorteio as jest.Mock).mockReturnValue(["identificador",])
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
    (useIdentificadorDoSorteio as jest.Mock).mockReturnValue(["identificador",])
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
    expect(mockSorteio).toHaveBeenCalledTimes(1)
  });
});
