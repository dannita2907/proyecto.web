import { useState } from 'react'
import campos from '../data/camposRegistro.json'
export default function useActualizacionDatos(usuario, onActualizar) {
  const [datos, setDatos] = useState({ nombre: usuario.nombre || '', telefono: usuario.telefono || '', direccion: usuario.direccion || '' })
  const camposEditables = campos.filter(c => c.editable)
  function cambiar(campo, valor) { setDatos(previos => ({ ...previos, [campo]: valor })) }
  function guardar() {
    if (Object.values(datos).some(v => !v.trim())) return alert('Complete todos los campos')
    if (!/^[0-9]{7,15}$/.test(datos.telefono.trim())) return alert('Ingrese un teléfono válido')
    if (onActualizar({ nombre: datos.nombre.trim(), telefono: datos.telefono.trim(), direccion: datos.direccion.trim() }) === false) return alert('No se pudieron guardar los cambios')
    alert('Datos actualizados')
  }
  return { datos, camposEditables, cambiar, guardar }
}
