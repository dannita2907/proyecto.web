import useAgendamiento from '../Hooks/useAgendamiento.js'
import Agendamiento from '../Componentes/Agendamiento.jsx'

export default function AgendamientoPage({ usuario, onVolver }) {
  const { datos, filtro, lista, hoy, cambiar, agendar, setFiltro } = useAgendamiento(usuario)

  return (
    <Agendamiento
      datos={datos}
      hoy={hoy}
      lista={lista}
      filtro={filtro}
      onChange={cambiar}
      onSubmit={agendar}
      onFiltro={setFiltro}
      onVolver={onVolver}
    />
  )
}