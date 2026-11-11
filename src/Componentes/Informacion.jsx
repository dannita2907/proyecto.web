import Pantalla from './Pantalla.jsx'
import Boton from './Formulario/Boton.jsx'
import Efecto from '../Home/Efecto.jsx'
import Tarjeta from '../Tarjetas/Tarjeta.jsx'
import '../Style/informacion.css'

function Informacion({ pestanas, activa, pestana, onSeleccionar, onVolver }) {
  return (
    <Pantalla onVolver={onVolver}>
      <h1>Información</h1>

      <nav className="pestanas">
        {pestanas.map((p) => (
          <Boton
            key={p.id}
            texto={p.titulo}
            clase={p.id === activa ? 'activa' : ''}
            onClick={() => onSeleccionar(p.id)}
          />
        ))}
      </nav>

      <section className="lista-tarjetas" key={activa}>
        {pestana.tarjetas.map((t, i) => (
          <Efecto key={t.titulo} tipo="subir" retraso={i * 0.15}>
            <Tarjeta {...t} />
          </Efecto>
        ))}
      </section>
    </Pantalla>
  )
}

export default Informacion