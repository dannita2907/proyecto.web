import { useState } from 'react'
import campos from '../data/camposRegistro.json'

export default function useActualizacionDatos(usuario, onActualizar) {
  const [datos, setDatos] = useState({
    nombre: usuario.nombre || '',
    telefono: usuario.telefono || '',
    direccion: usuario.direccion || '',
  })

  const camposEditables = campos.filter((c) => c.editable)

  function cambiar(campo, valor) {
    setDatos({ ...datos, [campo]: valor })
  }

  function guardar() {
    if (Object.values(datos).includes('')) return alert('Complete todos los campos')
    onActualizar(datos)
    alert('Datos actualizados')
  }

  return { datos, camposEditables, cambiar, guardar }
}