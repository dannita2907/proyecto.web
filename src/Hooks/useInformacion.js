import { useState } from 'react'
import informacion from '../data/informacion.json'

export default function useInformacion(pestanaInicial) {
  const [activa, setActiva] = useState(pestanaInicial)

  const pestana = informacion.find((p) => p.id === activa)

  return { pestanas: informacion, activa, pestana, setActiva }
}