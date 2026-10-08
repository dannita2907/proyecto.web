function Selector({ etiqueta, valor, opciones, vacio = 'Seleccione', onCambio }) {
  return (
    <div>
      <label>{etiqueta}</label>
      <select value={valor} onChange={(e) => onCambio(e.target.value)}>
        <option value="">{vacio}</option>
        {opciones.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

export default Selector