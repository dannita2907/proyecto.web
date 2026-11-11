import { useState } from 'react'
import certificados from '../data/certificados.json'

export default function useCertificados() {
  const [elegido, setElegido] = useState('')

  const tipo = certificados.find((c) => c.nombre === elegido)
  const opciones = certificados.map((c) => c.nombre)

  return { elegido, setElegido, tipo, opciones }
}