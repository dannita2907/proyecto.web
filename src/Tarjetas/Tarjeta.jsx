import '../Style/tarjeta.css'

function Tarjeta({ icono, titulo, texto }) {
  return (
    <article className="tarjeta">
      <div className="tarjeta-icono">{icono}</div>
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </article>
  )
}

export default Tarjeta
