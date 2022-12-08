import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Home from "./Home";

const mockNavegacao = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useNavigate: () => mockNavegacao,
  };
});

describe("página inicial", () => {
  test("a renderização ocorre corretamente", () => {
    const {container}  = render(
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    );

    expect(container).toMatchSnapshot();
  });
});
