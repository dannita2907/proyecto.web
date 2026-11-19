import { useState } from 'react'
import respuestas from '../data/respuestas.json'

export default function useDaDaIA() {
  const [texto, setTexto] = useState('')
  const [mensajes, setMensajes] = useState([{ autor: 'bot', texto: 'Hola, soy DaDaIA. Pregúntame por citas, certificados, datos o afiliaciones.' }])
  function cambiar(e) { setTexto(e.target.value) }
  function responder(pregunta) {
    const minuscula = pregunta.toLowerCase()
    const r = respuestas.find(x => x.palabras.some(p => minuscula.includes(p)))
    return r ? r.respuesta : 'No entendí tu pregunta, intenta con otras palabras.'
  }
  function enviar() {
    const pregunta = texto.trim()
    if (!pregunta) return
    setMensajes(previos => [...previos, { autor: 'usuario', texto: pregunta }, { autor: 'bot', texto: responder(pregunta) }])
    setTexto('')
  }
  function teclaPresionada(e) { if (e.key === 'Enter') enviar() }
  return { texto, mensajes, cambiar, enviar, teclaPresionada }
}
