import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import {useListaDeParticipantes} from "../../state/hooks/useListaDeParticipantes";
import ListaDeParticipantes from ".";

jest.mock("../../state/hooks/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})

describe("lista de participantes vazia", () => {
  test("lista de participantes é renderizada vazia", () => {
    render(
      <RecoilRoot>
        <ListaDeParticipantes />
      </RecoilRoot>
    );

    const itens = screen.queryAllByRole("listitem");

    expect(itens).toHaveLength(0);
  });
});

describe("lista de participantes preenchida", () => {
  const participantes = ["Vivih", "Isa"];
  beforeEach(() =>
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
  );
  test("lista é renderizada sem participantes", () => {
    render(
      <RecoilRoot>
        <ListaDeParticipantes />
      </RecoilRoot>
    );

    const itens = screen.queryAllByRole("listitem");

    expect(itens).toHaveLength(participantes.length);
  });
});
