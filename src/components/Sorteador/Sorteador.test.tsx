import { act, fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Sorteador from ".";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router";
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes";
import { useDataResultado } from "../../state/hooks/useDataResultado";

jest.mock("../../state/hooks/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

jest.mock("../../state/hooks/useDataResultado.ts", () => {
  return {
    useDataResultado: jest.fn()
  }
})

jest.mock("react-router", () => {
  return {
    ...jest.requireActual("react-router"),
    useParams: jest.fn(),
  };
});

jest.mock("../../state/hooks/useIdsDosParticipantes.ts", () => {
  return {
    useIdsDosParticipantes: jest.fn(),
  };
});

describe("página de sorteio", () => {
  const participantes = ["vivih", "matheus", "isa"];

  const resultado = "matheus";

  beforeEach(() => {

    (useParams as jest.Mock).mockReturnValue({
      identificador: "identificador",
      nome: "matheus",
      idDoParticipante: "1",
    });

    (useListaDeParticipantes as jest.Mock).mockReturnValue([participantes]);

    (useDataResultado as jest.Mock).mockReturnValue([resultado]);
  });

  test("o amigo secreto é exibido quando solicitado", () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <Sorteador/>
        </RecoilRoot>
      </BrowserRouter>
    );

    let amigoSecreto = screen.queryByRole("alert");

    expect(amigoSecreto).not.toBeInTheDocument();

    const botao = screen.getByRole("button");

    expect(botao).not.toBeDisabled()

    fireEvent.click(botao);

    amigoSecreto = screen.getByRole("alert")

    expect(amigoSecreto).toBeInTheDocument();
  });

  test("o amigo secreto desaparece após os timers", () => {
    jest.useFakeTimers();

    render(
      <BrowserRouter>
        <RecoilRoot>
          <Sorteador/>
        </RecoilRoot>
      </BrowserRouter>
    );

    const botao = screen.getByRole("button");

    fireEvent.click(botao);

    const amigoSecreto = screen.getByRole("alert");

    expect(amigoSecreto).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    expect(amigoSecreto).not.toBeInTheDocument();
  });
});
