import { useState } from 'react'

const vacio = { nombre: '', sede: '' }

export default function useIngreso(onIngresar) {
  const [datos, setDatos] = useState(vacio)

  function cambiar(campo, valor) {
    setDatos({ ...datos, [campo]: valor })
  }

  function enviar() {
    if (datos.nombre === '' || datos.sede === '') {
      return alert('Ingrese el nombre de la EPS y seleccione la sede')
    }
    onIngresar(datos.nombre, datos.sede)
  }

  return { datos, cambiar, enviar }
}