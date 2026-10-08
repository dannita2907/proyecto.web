import { useState } from 'react'
import Pantalla from '../Componentes/Pantalla.jsx'
import Boton from '../Componentes/Formulario/Boton.jsx'
import Efecto from '../Home/Efecto.jsx'
import Tarjeta from '../Tarjetas/Tarjeta.jsx'
import informacion from '../data/informacion.json'
import '../Style/informacion.css'

function Informacion({ pestanaInicial, onVolver }) {
  const [activa, setActiva] = useState(pestanaInicial)
  const pestana = informacion.find((p) => p.id === activa)

  return (
    <Pantalla onVolver={onVolver}>
      <h1>Información</h1>

      <nav className="pestanas">
        {informacion.map((p) => (
          <Boton key={p.id} texto={p.titulo} clase={p.id === activa ? 'activa' : ''}
            onClick={() => setActiva(p.id)} />
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