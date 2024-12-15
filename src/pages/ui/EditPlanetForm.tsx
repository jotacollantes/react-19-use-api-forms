import { useActionState } from "react";
import { Planet } from "../../interfaces/planet.interface";
import { createPlanetActionForm } from "../../actions/create-planet.action";
import { SubmitButton } from "./SubmitButton";

interface Props {
  onAddPlanet: (planet: Planet) => void;
}

export const EditPlanetForm = ({ onAddPlanet }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, formAction, _isPending] = useActionState(
    async (prevState: unknown, queryData: FormData) => {
      console.log("Aqui");
      console.log(prevState, queryData);
      const planet = await createPlanetActionForm(prevState, queryData);
      console.log(planet);
      onAddPlanet(planet);
    },
    //Valor inicial
    null
  );
  // const [name, setName] = useState('');
  // const [type, setType] = useState('');
  // const [distanceFromSun, setDistanceFromSun] = useState('');

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   onAddPlanet({ name, type, distanceFromSun });
  // };

  return (
    // <form className="mb-4 flex flex-col md:flex-row" onSubmit={handleSubmit}>
    <form className="mb-4 flex flex-col md:flex-row" action={formAction}>
      {/* <h1>{isPending ? "Pending..." : null}</h1> */}
      <input
        type="text"
        placeholder="Nombre del planeta"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name="name"
        required
        //value={name}
        //onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tipo de astro"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name="type"
        required
        //value={type}
        //onChange={(e) => setType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Distancia del sol"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name="distanceFromSun"
        required
        //value={distanceFromSun}
        //onChange={(e) => setDistanceFromSun(e.target.value)}
      />
      {/* <button
        type="submit"
        className="bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded flex-1 sm:flex-none"
        disabled={isPending}
      >
        Agregar planeta
      </button> */}
      <SubmitButton />
    </form>
  );
};
