import logo from '../asset/logo.svg'

function Encabezado({ texto }) {
  return (
    <header className="encabezado">
      <img src={logo} alt="Logo EPS" width="50" />
      <strong>{texto}</strong>
    </header>
  )
}

export default Encabezado