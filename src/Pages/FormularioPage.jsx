import useFormulario from '../Hooks/useFormulario.js'
import Formulario from '../Componentes/Formulario/Formulario.jsx'

// La página conecta el hook (lógica) con el componente (lo que se ve)
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