import useDaDaIA from '../Hooks/useDaDaIA.js'
import DaDaIA from '../Componentes/DaDaIA.jsx'

export default function DaDaIAPage({ onVolver }) {
  const { texto, mensajes, cambiar, enviar, teclaPresionada } = useDaDaIA()

  return (
    <DaDaIA
      texto={texto}
      mensajes={mensajes}
      onChange={cambiar}
      onSubmit={enviar}
      onKeyDown={teclaPresionada}
      onVolver={onVolver}
    />
  )
}