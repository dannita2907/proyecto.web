import Pantalla from './Pantalla.jsx'
import Campo from './Campo.jsx'
import Selector from './Selector.jsx'
import Boton from './Formulario/Boton.jsx'
import sedes from '../data/sedes.json'
import logo from '../asset/logo.svg'
import '../Style/ingreso.css'

function Ingreso({ datos, onChange, onSubmit }) {
  return (
    <Pantalla fondo="pantalla-ingreso">
      <section className="caja-ingreso">
        <img src={logo} alt="Logo EPS" width="90" />
        <h2>Ingreso EPS</h2>
        <Campo
          etiqueta="Nombre de la EPS"
          valor={datos.nombre}
          onCambio={(valor) => onChange('nombre', valor)}
        />
        <Selector
          etiqueta="Sede"
          valor={datos.sede}
          opciones={sedes}
          vacio="Seleccione la sede"
          onCambio={(valor) => onChange('sede', valor)}
        />
        <Boton texto="Ingresar" onClick={onSubmit} />
      </section>
    </Pantalla>
  )
}

export default Ingreso