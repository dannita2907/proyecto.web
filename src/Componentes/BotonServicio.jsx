import '../Style/boton-servicio.css'

function BotonServicio({ nombre, onSeleccionar }) {
  return (
    <button className="boton-servicio" onClick={onSeleccionar}>
      {nombre}
    </button>
  )
}

export default BotonServicio
