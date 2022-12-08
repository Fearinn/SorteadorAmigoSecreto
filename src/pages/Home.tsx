import Card from "../components/Card";
import Formulario from "../components/Formulario";
import ListaDeParticipantes from "../components/ListaDeParticipantes";
import Rodape from "../components/Rodape";

const Home = () => {
  return (
    <>
      <Card>
        <Formulario />
        <ListaDeParticipantes />
        <Rodape />
      </Card>
    </>
  );
};

export default Home;
