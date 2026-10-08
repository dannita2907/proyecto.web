function Boton({ texto, onClick, clase }) {
  return <button className={clase} onClick={onClick}>{texto}</button>
}

export default Boton