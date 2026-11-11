import useIngreso from '../Hooks/useIngreso.js'
import Ingreso from '../Componentes/Ingreso.jsx'

export default function IngresoPage({ onIngresar }) {
  const { datos, cambiar, enviar } = useIngreso(onIngresar)

  return <Ingreso datos={datos} onChange={cambiar} onSubmit={enviar} />
}