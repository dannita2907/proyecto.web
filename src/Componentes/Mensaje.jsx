function Mensaje({ autor, texto }) {
  return <div className={`mensaje ${autor}`}>{texto}</div>
}

export default Mensaje