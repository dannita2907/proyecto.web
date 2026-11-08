import { useState } from 'react'
import Ingreso from '../Pages/Ingreso.jsx'
import Servicios from '../Pages/Servicios.jsx'
import Agendamiento from '../Pages/Agendamiento.jsx'
import ActualizacionDatos from '../Pages/ActualizacionDatos.jsx'
import Certificados from '../Pages/Certificados.jsx'
import DaDaIA from '../Pages/DaDaIA.jsx'
import Informacion from '../Pages/Informacion.jsx'
import Home from '../Home/Home.jsx'
import FormularioPage from '../Pages/FormularioPage.jsx'
import useTarjeta from '../Hooks/useTarjeta.js'
import datosTarjetas from '../data/tarjetas.json'

// El Orquestador decide qué pantalla se muestra
function Orquestador() {
  const [pantalla, setPantalla] = useState('ingreso')
  const [pestana, setPestana] = useState('bienestar')
  const [epsNombre, setEpsNombre] = useState(localStorage.getItem('epsNombre') || '')
  const [sede, setSede] = useState(localStorage.getItem('sede') || '')
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuarioActivo')))

  // La lista de tarjetas vive aquí (en el padre) y se reparte por props
  const { tarjeta } = useTarjeta(datosTarjetas)

  // Cambia de pantalla (y de pestaña, si se indica)
  function irA(nuevaPantalla, nuevaPestana) {
    if (nuevaPestana) setPestana(nuevaPestana)
    setPantalla(nuevaPantalla)
  }

  function ingresar(nombre, sedeElegida) {
    setEpsNombre(nombre)
    setSede(sedeElegida)
    localStorage.setItem('epsNombre', nombre)
    localStorage.setItem('sede', sedeElegida)
    setPantalla('home')
  }

  function iniciarSesion(usuarioNuevo) {
    setUsuario(usuarioNuevo)
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioNuevo))
    setPantalla('servicios')
  }

  function cerrarSesion() {
    setUsuario(null)
    localStorage.removeItem('usuarioActivo')
    setPantalla('home')
  }

  function actualizarUsuario(datosNuevos) {
    const usuarioNuevo = { ...usuario, ...datosNuevos }
    setUsuario(usuarioNuevo)
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioNuevo))
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const actualizados = usuarios.map((u) => (u.correo === usuario.correo ? { ...u, ...datosNuevos } : u))
    localStorage.setItem('usuarios', JSON.stringify(actualizados))
  }

  const volver = () => setPantalla('servicios')

  if (pantalla === 'ingreso') return <Ingreso onIngresar={ingresar} />
  if (pantalla === 'home') return <Home epsNombre={epsNombre} usuario={usuario} tarjetas={tarjeta} onNavegar={irA} />
  if (pantalla === 'formulario') return <FormularioPage onIniciarSesion={iniciarSesion} onVolver={() => setPantalla('home')} />
  if (pantalla === 'agendamiento') return <Agendamiento usuario={usuario} onVolver={volver} />
  if (pantalla === 'actualizacion') return <ActualizacionDatos usuario={usuario} onActualizar={actualizarUsuario} onVolver={volver} />
  if (pantalla === 'certificados') return <Certificados usuario={usuario} epsNombre={epsNombre} sede={sede} onVolver={volver} />
  if (pantalla === 'dadaia') return <DaDaIA onVolver={volver} />
  if (pantalla === 'informacion') return <Informacion pestanaInicial={pestana} onVolver={volver} />

  return (
    <Servicios epsNombre={epsNombre} sede={sede} usuario={usuario} onNavegar={irA} onCerrarSesion={cerrarSesion} />
  )
}

export default Orquestador