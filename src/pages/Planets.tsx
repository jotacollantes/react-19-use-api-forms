import { FC, use, useState } from 'react';

import { Planet } from '../interfaces/planet.interface';
import { EditPlanetForm } from './ui/EditPlanetForm';
import { PlanetList } from './ui/PlanetList';
//import { PlanetList } from './ui/PlanetList';
interface Props {
  getPlanets: Promise<Planet[]>
}


const Planets: FC<Props> = ({getPlanets}) => {
  //! Para que funcione getPlanets hay que recibirla como Props
  //! El tipo de dato de la propiedad tiene que ser Promise<Planet[]> y no () => Promise<Planet[]> porque el use() recibe como parametro un usable y no la funcion o la referencia.
  const originalPlanets=use(getPlanets)
  const [planets, setPlanets] = useState(originalPlanets)
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [planets, setPlanets] = useState<Planet[]>([]);

  // useEffect(() => {
  //   getPlanets()
  //     .then((res) => {
  //       setPlanets(res);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setIsLoading(false);
  //     });
  // }, []);

  const handleAddPlanet = async (planet: Planet) => {
    //console.log(planet);
    //const newPlanet= await createPlanetAction(planet)
    //console.log("exito",newPlanet)
    setPlanets([...planets,planet])
  };

  return (
    <>
      <h4 className="text-2xl font-thin mb-4">Agregar y mantener planetas</h4>
      <hr className="border-gray-300 mb-4" />
      {/* Formulario para agregar un planeta */}
      <EditPlanetForm onAddPlanet={handleAddPlanet} />

      {
      // error && (
      //   <p>
      //     Error al cargar los planetas -{' '}
      //     <small className="text-red-500">{error}</small>
      //   </p>
      // )
      }

      {/* Lista de planetas Grid*/}
      {
      //isLoading ? <p>Cargando...</p> : <PlanetList planets={planets} />
      <PlanetList planets={planets} />
      }
    </>
  );
};

export default Planets;
