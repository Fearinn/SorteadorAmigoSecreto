import { Outlet } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";

const Padrao = () => {
  return (
    <>
      <Cabecalho />
      <Outlet />
    </>
  );
};

export default Padrao
