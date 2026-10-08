import { useState } from 'react'
import Pantalla from '../Componentes/Pantalla.jsx'
import Campo from '../Componentes/Campo.jsx'
import Selector from '../Componentes/Selector.jsx'
import Cita from '../Componentes/Cita.jsx'
import Boton from '../Componentes/Formulario/Boton.jsx'
import especialidades from '../data/especialidades.json'
import '../Style/agendamiento.css'

function Agendamiento({ usuario, onVolver }) {
  const [especialidad, setEspecialidad] = useState('')
  const [fecha, setFecha] = useState('')
  const [filtro, setFiltro] = useState('')
  const [citas, setCitas] = useState(JSON.parse(localStorage.getItem('citas')) || [])
  const hoy = new Date().toLocaleDateString('en-CA')

  function agendar() {
    if (especialidad === '' || fecha < hoy) return alert('Seleccione la especialidad y una fecha válida')

    const nuevas = [...citas, { id: Date.now(), correo: usuario.correo, especialidad, fecha }]
    setCitas(nuevas)
    localStorage.setItem('citas', JSON.stringify(nuevas))
    setEspecialidad('')
    setFecha('')
  }

  const lista = citas.filter(
    (c) => c.correo === usuario.correo && (filtro === '' || c.especialidad === filtro)
  )

  return (
    <Pantalla onVolver={onVolver}>
      <section className="contenedor-agendamiento">
        <h1>Agendamiento de citas</h1>

        <div className="fila-agendamiento">
          <Selector etiqueta="Especialidad médica" valor={especialidad} opciones={especialidades}
            onCambio={setEspecialidad} />
          <Campo etiqueta="Fecha" tipo="date" min={hoy} valor={fecha} onCambio={setFecha} />
        </div>
        <Boton texto="Confirmar cita" onClick={agendar} />

        <div className="filtro-citas">
          <Selector etiqueta="Filtrar por especialidad" valor={filtro} opciones={especialidades}
            vacio="Todas" onCambio={setFiltro} />
        </div>

        <ul className="lista-citas">
          {lista.length === 0 && <li>No hay citas para mostrar</li>}
          {lista.map((c) => <Cita key={c.id} {...c} />)}
        </ul>
      </section>
    </Pantalla>
  )
}

export default Agendamiento