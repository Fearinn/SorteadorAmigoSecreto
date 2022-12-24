import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Home from "./Home";

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
