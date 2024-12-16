import { planetsApi } from "../api/planetsApi";
import type { Planet } from "../interfaces/planet.interface";

// const sleep =async() =>{
//     return new Promise((resolv)=>setTimeout(resolv,2000))
// }
export const updatePlanetAction = async (planet: Planet) => {
  try {
    //await sleep() //Esperamos 2 segundos.
    //!Inducimos al error
    //throw new Error('Error de prueba')
    return await planetsApi
      .patch<Planet>(`/${planet.id}`, planet)
      .then((res) => {
        //console.log("planeta actualizado")
        console.log(res.data)
       return  res.data
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error actualizando planeta");
  }
};
