import useOrquestador from '../Hooks/useOrquestador.js'
import IngresoPage from '../Pages/IngresoPage.jsx'
import Servicios from '../Pages/Servicios.jsx'
import AgendamientoPage from '../Pages/AgendamientoPage.jsx'
import ActualizacionDatosPage from '../Pages/ActualizacionDatosPage.jsx'
import CertificadosPage from '../Pages/CertificadosPage.jsx'
import DaDaIAPage from '../Pages/DaDaIAPage.jsx'
import InformacionPage from '../Pages/InformacionPage.jsx'
import FormularioPage from '../Pages/FormularioPage.jsx'
import Home from '../Home/Home.jsx'

function Orquestador() {
  const {
    pantalla, pestana, epsNombre, sede, usuario, tarjeta,
    irA, volver, ingresar, iniciarSesion, cerrarSesion, actualizarUsuario,
  } = useOrquestador()

  if (pantalla === 'ingreso') return <IngresoPage onIngresar={ingresar} />
  if (pantalla === 'home') return <Home epsNombre={epsNombre} usuario={usuario} tarjetas={tarjeta} onNavegar={irA} />
  if (pantalla === 'formulario') return <FormularioPage onIniciarSesion={iniciarSesion} onVolver={() => irA('home')} />
  if (pantalla === 'agendamiento') return <AgendamientoPage usuario={usuario} onVolver={volver} />
  if (pantalla === 'actualizacion') return <ActualizacionDatosPage usuario={usuario} onActualizar={actualizarUsuario} onVolver={volver} />
  if (pantalla === 'certificados') return <CertificadosPage usuario={usuario} epsNombre={epsNombre} sede={sede} onVolver={volver} />
  if (pantalla === 'dadaia') return <DaDaIAPage onVolver={volver} />
  if (pantalla === 'informacion') return <InformacionPage pestanaInicial={pestana} onVolver={volver} />

  return (
    <Servicios epsNombre={epsNombre} sede={sede} usuario={usuario} onNavegar={irA} onCerrarSesion={cerrarSesion} />
  )
}

export default Orquestador