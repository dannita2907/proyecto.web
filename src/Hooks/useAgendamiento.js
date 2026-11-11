import { useState } from 'react'

const vacio = { especialidad: '', fecha: '' }

export default function useAgendamiento(usuario) {
  const [datos, setDatos] = useState(vacio)
  const [filtro, setFiltro] = useState('')
  const [citas, setCitas] = useState(JSON.parse(localStorage.getItem('citas')) || [])
  const hoy = new Date().toLocaleDateString('en-CA')

  function cambiar(campo, valor) {
    setDatos({ ...datos, [campo]: valor })
  }

  function agendar() {
    if (datos.especialidad === '' || datos.fecha < hoy) {
      return alert('Seleccione la especialidad y una fecha válida')
    }
    const nuevas = [...citas, { id: Date.now(), correo: usuario.correo, ...datos }]
    setCitas(nuevas)
    localStorage.setItem('citas', JSON.stringify(nuevas))
    setDatos(vacio)
  }

  const lista = citas.filter(
    (c) => c.correo === usuario.correo && (filtro === '' || c.especialidad === filtro)
  )

  return { datos, filtro, lista, hoy, cambiar, agendar, setFiltro }
}