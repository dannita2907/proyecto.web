import Pantalla from './Pantalla.jsx'
import Campo from './Campo.jsx'
import Selector from './Selector.jsx'
import Cita from './Cita.jsx'
import Boton from './Formulario/Boton.jsx'
import especialidades from '../data/especialidades.json'
import '../Style/agendamiento.css'

function Agendamiento({ datos, hoy, lista, filtro, onChange, onSubmit, onFiltro, onVolver }) {
  return (
    <Pantalla onVolver={onVolver}>
      <section className="contenedor-agendamiento">
        <h1>Agendamiento de citas</h1>

        <div className="fila-agendamiento">
          <Selector
            etiqueta="Especialidad médica"
            valor={datos.especialidad}
            opciones={especialidades}
            onCambio={(valor) => onChange('especialidad', valor)}
          />
          <Campo
            etiqueta="Fecha"
            tipo="date"
            min={hoy}
            valor={datos.fecha}
            onCambio={(valor) => onChange('fecha', valor)}
          />
        </div>
        <Boton texto="Confirmar cita" onClick={onSubmit} />

        <div className="filtro-citas">
          <Selector
            etiqueta="Filtrar por especialidad"
            valor={filtro}
            opciones={especialidades}
            vacio="Todas"
            onCambio={onFiltro}
          />
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