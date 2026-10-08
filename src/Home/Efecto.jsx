import '../Style/efecto.css'

// Envuelve a otro componente y le da una animación CSS
// tipo: "aparecer" o "subir"  |  retraso: segundos antes de empezar
function Efecto({ tipo = 'aparecer', retraso = 0, children }) {
  return (
    <div className={`efecto efecto-${tipo}`} style={{ animationDelay: `${retraso}s` }}>
      {children}
    </div>
  )
}

export default Efecto
