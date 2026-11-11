import Pantalla from './Pantalla.jsx'
import Selector from './Selector.jsx'
import '../Style/certificados.css'

function Certificados({ usuario, epsNombre, sede, elegido, opciones, tipo, onChange, onVolver }) {
  return (
    <Pantalla onVolver={onVolver}>
      <section className="contenedor-certificados">
        <h1>Certificados</h1>
        <Selector
          etiqueta="Seleccione el certificado"
          valor={elegido}
          opciones={opciones}
          onCambio={onChange}
        />

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