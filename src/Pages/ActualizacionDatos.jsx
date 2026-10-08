import { useState } from 'react'
import Pantalla from '../Componentes/Pantalla.jsx'
import Campo from '../Componentes/Campo.jsx'
import Boton from '../Componentes/Formulario/Boton.jsx'
import campos from '../data/camposRegistro.json'
import '../Style/formulario.css'

function ActualizacionDatos({ usuario, onActualizar, onVolver }) {
  const [datos, setDatos] = useState({
    nombre: usuario.nombre || '',
    telefono: usuario.telefono || '',
    direccion: usuario.direccion || '',
  })

  function guardar() {
    if (Object.values(datos).includes('')) return alert('Complete todos los campos')
    onActualizar(datos)
    alert('Datos actualizados')
  }

  return (
    <Pantalla onVolver={onVolver}>
      <section className="caja-formulario">
        <h2>Actualización de datos</h2>
        <p>Correo: {usuario.correo}</p>
        <p style={{ marginBottom: 20 }}>Documento: {usuario.documento}</p>

        {campos.filter((c) => c.editable).map((c) => (
          <Campo key={c.name} etiqueta={c.label} tipo={c.type} valor={datos[c.name]}
            onCambio={(v) => setDatos({ ...datos, [c.name]: v })} />
        ))}
        <Boton texto="Guardar cambios" onClick={guardar} />
      </section>
    </Pantalla>
  )
}

export default ActualizacionDatos