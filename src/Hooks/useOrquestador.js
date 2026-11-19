import { useState } from 'react'
import useTarjeta from './useTarjeta'
import datosTarjetas from '../data/tarjetas.json'
import { leerJSON, guardarJSON, leerTexto, guardarTexto, eliminar } from '../services/storage.js'

export default function useOrquestador() {
  const [pantalla, setPantalla] = useState('ingreso')
  const [pestana, setPestana] = useState('bienestar')
  const [epsNombre, setEpsNombre] = useState(() => leerTexto('epsNombre'))
  const [sede, setSede] = useState(() => leerTexto('sede'))
  const [usuario, setUsuario] = useState(() => leerJSON('usuarioActivo', null))
  const { tarjeta, agregar } = useTarjeta(datosTarjetas)

  function irA(nuevaPantalla, nuevaPestana) {
    if (nuevaPestana) setPestana(nuevaPestana)
    setPantalla(nuevaPantalla)
  }

  function ingresar(nombre, sedeElegida) {
    setEpsNombre(nombre)
    setSede(sedeElegida)
    guardarTexto('epsNombre', nombre)
    guardarTexto('sede', sedeElegida)
    setPantalla('home')
  }

  function iniciarSesion(usuarioNuevo) {
    setUsuario(usuarioNuevo)
    guardarJSON('usuarioActivo', usuarioNuevo)
    setPantalla('servicios')
  }

  function cerrarSesion() {
    setUsuario(null)
    eliminar('usuarioActivo')
    setPantalla('home')
  }

  function actualizarUsuario(datosNuevos) {
    if (!usuario) return false
    const usuarios = leerJSON('usuarios', [])
    if (!Array.isArray(usuarios)) return false
    const actualizados = usuarios.map(u => u.correo === usuario.correo ? { ...u, ...datosNuevos } : u)
    if (!guardarJSON('usuarios', actualizados)) return false
    const actualizado = { ...usuario, ...datosNuevos }
    setUsuario(actualizado)
    guardarJSON('usuarioActivo', actualizado)
    return true
  }

  const volver = () => setPantalla(usuario ? 'servicios' : 'home')
  return { pantalla, pestana, epsNombre, sede, usuario, tarjeta, irA, volver, ingresar, iniciarSesion, cerrarSesion, actualizarUsuario, agregar }
}
