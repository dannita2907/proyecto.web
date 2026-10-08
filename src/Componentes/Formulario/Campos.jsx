function Campos({ lista, datos, onCambiar, registro }) {
  return (
    <>
      {lista.map((c) => (
        <div key={c.name}>
          <label>{c.label}</label>
          <input type={c.type} name={c.name} value={datos[c.name]} onChange={onCambiar} />
        </div>
      ))}

      <label>Contraseña</label>
      <input type="password" name="contrasena" value={datos.contrasena} onChange={onCambiar} />

      {registro && (
        <>
          <label>Confirmar contraseña</label>
          <input type="password" name="confirmar" value={datos.confirmar} onChange={onCambiar} />
        </>
      )}
    </>
  )
}

export default Campos