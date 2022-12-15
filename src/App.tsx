import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";
import Padrao from "./pages/Padrao";
import Sorteio from "./pages/Sorteio";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Padrao />}>
            <Route index element={<Home />} />
            <Route
              path="sorteio/:identificador/:nome/:idDoParticipante"
              element={<Sorteio />}
            />
            <Route path="*" />
          </Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
