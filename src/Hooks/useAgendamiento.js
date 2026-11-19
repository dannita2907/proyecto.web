import { useState } from 'react'
import especialidades from '../data/especialidades.json'
import { leerJSON, guardarJSON } from '../services/storage.js'

const vacio = { especialidad: '', fecha: '' }
function fechaHoyLocal() {
  const ahora = new Date()
  return [ahora.getFullYear(), String(ahora.getMonth() + 1).padStart(2, '0'), String(ahora.getDate()).padStart(2, '0')].join('-')
}

export default function useAgendamiento(usuario) {
  const [datos, setDatos] = useState(vacio)
  const [filtro, setFiltro] = useState('')
  const [citas, setCitas] = useState(() => {
    const guardadas = leerJSON('citas', [])
    return Array.isArray(guardadas) ? guardadas : []
  })
  const hoy = fechaHoyLocal()

  function cambiar(campo, valor) {
    setDatos(anteriores => ({ ...anteriores, [campo]: valor }))
  }

  function agendar() {
    if (!usuario?.correo) return alert('Inicie sesión para agendar')
    if (!especialidades.includes(datos.especialidad) || !/^\d{4}-\d{2}-\d{2}$/.test(datos.fecha) || datos.fecha < fechaHoyLocal()) {
      return alert('Seleccione la especialidad y una fecha válida')
    }
    const nuevas = [...citas, { id: Date.now(), correo: usuario.correo, ...datos }]
    if (!guardarJSON('citas', nuevas)) return alert('No fue posible guardar la cita')
    setCitas(nuevas)
    setDatos(vacio)
    alert('Cita registrada correctamente')
  }

  const lista = citas.filter(c => c.correo === usuario?.correo && (!filtro || c.especialidad === filtro))
  return { datos, filtro, lista, hoy, cambiar, agendar, setFiltro }
}
