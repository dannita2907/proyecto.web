import Pantalla from '../Componentes/Pantalla.jsx'
import Encabezado from '../Componentes/Encabezado.jsx'
import BotonServicio from '../Componentes/BotonServicio.jsx'
import Boton from '../Componentes/Formulario/Boton.jsx'
import Efecto from '../Home/Efecto.jsx'
import servicios from '../data/servicios.json'
import '../Style/servicios.css'

function Servicios({ epsNombre, sede, usuario, onNavegar, onCerrarSesion }) {
  return (
    <Pantalla>
      <Encabezado texto={`${epsNombre} - ${sede}`} />
      <Efecto tipo="subir">
        <main className="contenedor-servicios">
          <h2>Hola, {usuario.nombre}</h2>
          {servicios.map((s) => (
            <BotonServicio key={s.id} nombre={s.nombre} onSeleccionar={() => onNavegar(s.pantalla, s.pestana)} />
          ))}
          <Boton texto="Cerrar sesión" clase="boton-secundario" onClick={onCerrarSesion} />
        </main>
      </Efecto>
    </Pantalla>
  )
}

export default Servicios