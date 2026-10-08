import { useState } from 'react'
import Pantalla from '../Componentes/Pantalla.jsx'
import Mensaje from '../Componentes/Mensaje.jsx'
import Boton from '../Componentes/Formulario/Boton.jsx'
import respuestas from '../data/respuestas.json'
import '../Style/dadaia.css'

function DaDaIA({ onVolver }) {
  const [texto, setTexto] = useState('')
  const [mensajes, setMensajes] = useState([
    { autor: 'bot', texto: 'Hola, soy DaDaIA. Pregúntame por citas, certificados, datos o afiliaciones.' },
  ])

  function responder(pregunta) {
    const minuscula = pregunta.toLowerCase()
    const r = respuestas.find((x) => x.palabras.some((p) => minuscula.includes(p)))
    return r ? r.respuesta : 'No entendí tu pregunta, intenta con otras palabras.'
  }

  function enviar() {
    if (texto.trim() === '') return
    setMensajes([...mensajes, { autor: 'usuario', texto }, { autor: 'bot', texto: responder(texto) }])
    setTexto('')
  }

  return (
    <Pantalla onVolver={onVolver}>
      <section className="chat">
        <h1>Asistente DaDaIA</h1>
        <div className="mensajes">
          {mensajes.map((m, i) => <Mensaje key={i} {...m} />)}
        </div>
        <div className="fila-chat">
          <input type="text" placeholder="Escribe tu pregunta" value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviar()} />
          <Boton texto="Enviar" onClick={enviar} />
        </div>
      </section>
    </Pantalla>
  )
}

export default DaDaIA