import { planetsApi } from "../api/planetsApi";
import { Planet } from "../interfaces/planet.interface";

export const createPlanetAction=async(planet: Partial<Planet>)=>{
try {
    return await planetsApi.post<Planet>('/',planet).then((res)=>res.data)
} catch (error) {
    console.log(error)
    return null
}
}


export const createPlanetActionForm=async(prevState:unknown,queryData:FormData)=>{
    const formData= Object.fromEntries(queryData.entries())
    console.log(queryData.entries())
    console.log(formData)
    try {
        return await planetsApi.post<Planet>('/',formData).then((res)=>res.data)
    } catch (error) {
        console.log(error)
        //return null
        throw new Error('No se pudo agragar planeta')
    }
    }