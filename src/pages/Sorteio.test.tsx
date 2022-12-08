import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Sorteio from "./Sorteio";

const mockNavegacao = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useNavigate: () => mockNavegacao,
  };
});

describe("página de sorteio", () => {
  test("a renderização ocorre corretamente", () => {
    const {container}  = render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    expect(container).toMatchSnapshot();
  });
});