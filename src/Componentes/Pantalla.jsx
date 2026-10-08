import BotonVolver from './Formulario/BotonVolver.jsx'

function Pantalla({ fondo = 'fondo-medico', onVolver, children }) {
  return (
    <div className={`pantalla ${fondo}`}>
      {children}
      {onVolver && <BotonVolver onClick={onVolver} />}
    </div>
  )
}

export default Pantalla