import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes";

const ListaDeParticipantes = () => {
  const [participantes,] = useListaDeParticipantes();

  return (
    <>
    {participantes.length > 0 && (
      <ul>
        {participantes?.map((participante) => (
          <li key={participante}>{participante}</li>
        ))}
      </ul>
    )}
    </>
  );
};
export default ListaDeParticipantes;
