import { useState } from 'react'
import Pantalla from '../Componentes/Pantalla.jsx'
import Selector from '../Componentes/Selector.jsx'
import Boton from '../Componentes/Formulario/Boton.jsx'
import certificados from '../data/certificados.json'
import '../Style/certificados.css'

function Certificados({ usuario, epsNombre, sede, onVolver }) {
  const [elegido, setElegido] = useState('')
  const tipo = certificados.find((c) => c.nombre === elegido)

  return (
    <Pantalla onVolver={onVolver}>
      <section className="contenedor-certificados">
        <h1>Certificados</h1>
        <Selector etiqueta="Seleccione el certificado" valor={elegido}
          opciones={certificados.map((c) => c.nombre)} onCambio={setElegido} />

        {tipo && (
          <div className="certificado">
            <h2>{tipo.nombre}</h2>
            <p>
              {epsNombre} ({sede}) certifica que <strong>{usuario.nombre}</strong>, con documento{' '}
              <strong>{usuario.documento}</strong>, {tipo.texto}.
            </p>
          </div>
        )}
      </section>
    </Pantalla>
  )
}

export default Certificados