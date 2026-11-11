import Pantalla from './Pantalla.jsx'
import Mensaje from './Mensaje.jsx'
import Boton from './Formulario/Boton.jsx'
import '../Style/dadaia.css'

function DaDaIA({ texto, mensajes, onChange, onSubmit, onKeyDown, onVolver }) {
  return (
    <Pantalla onVolver={onVolver}>
      <section className="chat">
        <h1>Asistente DaDaIA</h1>
        <div className="mensajes">
          {mensajes.map((m, i) => <Mensaje key={i} {...m} />)}
        </div>
        <div className="fila-chat">
          <input
            type="text"
            placeholder="Escribe tu pregunta"
            value={texto}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <Boton texto="Enviar" onClick={onSubmit} />
        </div>
      </section>
    </Pantalla>
  )
}

export default DaDaIA