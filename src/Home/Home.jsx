import Pantalla from '../Componentes/Pantalla.jsx'
import Encabezado from '../Componentes/Encabezado.jsx'
import Boton from '../Componentes/Formulario/Boton.jsx'
import Efecto from './Efecto.jsx'
import Tarjeta from '../Tarjetas/Tarjeta.jsx'
import tarjetas from '../data/tarjetas.json'
import '../Style/home.css'

function Home({ epsNombre, usuario, onNavegar }) {
  return (
    <Pantalla>
      <Encabezado texto={epsNombre} />
      <h1 className="titulo-home">Bienvenido a {epsNombre}</h1>

      <section className="lista-tarjetas">
        {tarjetas.map((t, i) => (
          <Efecto key={t.id} tipo="subir" retraso={i * 0.15}>
            <Tarjeta {...t} />
          </Efecto>
        ))}
      </section>

      <Boton
        texto={usuario ? 'Ir a servicios' : 'Iniciar sesión o registrarse'}
        onClick={() => onNavegar(usuario ? 'servicios' : 'formulario')}
      />
      <Boton texto="Cambiar EPS" clase="boton-secundario" onClick={() => onNavegar('ingreso')} />
    </Pantalla>
  )
}

export default Home