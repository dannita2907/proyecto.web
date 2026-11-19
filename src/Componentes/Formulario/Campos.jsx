function Campos({ lista, datos, onCambiar, registro }) {
  return (
    <>
      {lista.map(c => (
        <div key={c.name}>
          <label htmlFor={`registro-${c.name}`}>{c.label}</label>
          <input id={`registro-${c.name}`} type={c.type} name={c.name} value={datos[c.name]} onChange={onCambiar} autoComplete={c.name === 'correo' ? 'email' : 'off'} />
        </div>
      ))}
      <label htmlFor="registro-contrasena">Contraseña</label>
      <input id="registro-contrasena" type="password" name="contrasena" value={datos.contrasena} onChange={onCambiar} autoComplete={registro ? 'new-password' : 'current-password'} />
      {registro && <><label htmlFor="registro-confirmar">Confirmar contraseña</label><input id="registro-confirmar" type="password" name="confirmar" value={datos.confirmar} onChange={onCambiar} autoComplete="new-password" /></>}
    </>
  )
}
export default Campos
