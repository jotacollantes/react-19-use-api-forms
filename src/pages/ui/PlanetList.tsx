import { useOptimistic, useTransition } from "react";
import { Planet } from "../../interfaces/planet.interface";
import { updatePlanetAction } from "../../actions/update-planets.actions";

interface Props {
  planets: Planet[];
}

export const PlanetList = ({ planets }: Props) => {
  //const [newPlanets, setNewPlanets] = useState(planets);
  console.log({ planets });
  const [isPending, startTransiction] = useTransition();
  const [currentPlanets, setNewPlanets] = useOptimistic(
    planets,
    (current, newPlanet: Planet) => {
      console.log({ newPlanet });
      //!Devuelvo un nuevo arreglo con todos los planetas incluido el actualizado
      const updatedPlanets = current.map((planet: Planet) =>
        planet.id === newPlanet.id ? newPlanet : planet
      );
      console.log({ updatedPlanets });
      return updatedPlanets;
    }
  );

  const handleUpdatePlanet = async (planet: Planet) => {
   
    startTransiction(async () => {
      
      // const data = {
      //   ...planet,
      //   name: planet.name.toUpperCase(),
      // };
      planet.name = planet.name.toUpperCase();
      try {
        //!Mostramos los planetas de manera optimista antes de hacer el update en el backend

        setNewPlanets(planet);
        const updatedPlanet = await updatePlanetAction(planet);
        console.log({ updatedPlanet });
        //!En caso de que venga un nuevo Id de planeta
        //setNewPlanets(updatedPlanet);

        // setNewPlanets((prevState) => {
        //   return prevState.map((planet) => {
        //     if (planet.id === updatedPlanet.id) {
        //       return updatedPlanet;
        //     } else {
        //       //regresamos el planeta que estas iterando
        //       return planet;
        //     }
        //   });
        // });
      } catch (error) {
        //! Cuando un error aparezca necesitamos reversar y mostrar el planeta como estaba o sea como vino a la funcion.
        console.log(error);
        planet.name = planet.name.toLowerCase();
        setNewPlanets(planet);
      }
    });
  };
  console.log({ currentPlanets });
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn">
      {currentPlanets.map((planet) => (
        <div key={planet.id} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">{planet.name}</h2>
          <p className="text-gray-700">{planet.type}</p>
          <p className="text-gray-700">{planet.distanceFromSun}</p>
          <br />
          <button
            onClick={() => {
              console.log({ planet });
              handleUpdatePlanet(planet);
            }}
            className="bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded w-full"
            disabled={isPending}
          >
            Actualizar
          </button>
        </div>
      ))}
    </div>
  );
};
