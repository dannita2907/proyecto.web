import useFormulario from '../Hooks/useFormulario.js'
import Formulario from '../Componentes/Formulario/Formulario.jsx'

export default function FormularioPage({ onIniciarSesion, onVolver }) {
  const { modo, datos, error, camposVisibles, cambiar, cambiarModo, enviar } =
    useFormulario(onIniciarSesion)

  return (
    <Formulario
      modo={modo}
      datos={datos}
      error={error}
      camposVisibles={camposVisibles}
      onChange={cambiar}
      onSubmit={enviar}
      onCambiarModo={cambiarModo}
      onVolver={onVolver}
    />
  )
}