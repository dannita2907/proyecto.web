import useCertificados from '../Hooks/useCertificados.js'
import Certificados from '../Componentes/Certificados.jsx'

export default function CertificadosPage({ usuario, epsNombre, sede, onVolver }) {
  const { elegido, setElegido, tipo, opciones } = useCertificados()

  return (
    <Certificados
      usuario={usuario}
      epsNombre={epsNombre}
      sede={sede}
      elegido={elegido}
      opciones={opciones}
      tipo={tipo}
      onChange={setElegido}
      onVolver={onVolver}
    />
  )
}