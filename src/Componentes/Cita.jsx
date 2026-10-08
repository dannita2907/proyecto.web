import '../Style/cita.css'

function Cita({ especialidad, fecha }) {
  return (
    <li className="cita">
      <strong>{especialidad}</strong>
      <span>{fecha}</span>
    </li>
  )
}

export default Cita
