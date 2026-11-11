import useInformacion from '../Hooks/useInformacion.js'
import Informacion from '../Componentes/Informacion.jsx'

export default function InformacionPage({ pestanaInicial, onVolver }) {
  const { pestanas, activa, pestana, setActiva } = useInformacion(pestanaInicial)

  return (
    <Informacion
      pestanas={pestanas}
      activa={activa}
      pestana={pestana}
      onSeleccionar={setActiva}
      onVolver={onVolver}
    />
  )
}