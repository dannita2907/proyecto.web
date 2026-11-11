import useActualizacionDatos from '../Hooks/useActualizacionDatos.js'
import ActualizacionDatos from '../Componentes/ActualizacionDatos.jsx'

export default function ActualizacionDatosPage({ usuario, onActualizar, onVolver }) {
  const { datos, camposEditables, cambiar, guardar } = useActualizacionDatos(usuario, onActualizar)

  return (
    <ActualizacionDatos
      usuario={usuario}
      datos={datos}
      campos={camposEditables}
      onChange={cambiar}
      onSubmit={guardar}
      onVolver={onVolver}
    />
  )
}