import Pantalla from './Pantalla.jsx'
import Campo from './Campo.jsx'
import Boton from './Formulario/Boton.jsx'
import '../Style/formulario.css'

function ActualizacionDatos({ usuario, datos, campos, onChange, onSubmit, onVolver }) {
  return (
    <Pantalla onVolver={onVolver}>
      <section className="caja-formulario">
        <h2>Actualización de datos</h2>
        <p>Correo: {usuario.correo}</p>
        <p style={{ marginBottom: 20 }}>Documento: {usuario.documento}</p>

        {campos.map((c) => (
          <Campo
            key={c.name}
            etiqueta={c.label}
            tipo={c.type}
            valor={datos[c.name]}
            onCambio={(valor) => onChange(c.name, valor)}
          />
        ))}
        <Boton texto="Guardar cambios" onClick={onSubmit} />
      </section>
    </Pantalla>
  )
}

export default ActualizacionDatos