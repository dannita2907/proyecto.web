import { useState } from 'react'
import campos from '../data/camposRegistro.json'
import { leerJSON, guardarJSON } from '../services/storage.js'

const vacio = {
  nombre: '', documento: '', fechaNacimiento: '', telefono: '',
  direccion: '', correo: '', contrasena: '', confirmar: '',
}

function fechaLocal() {
  const d = new Date()
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-')
}

export default function useFormulario(onIniciarSesion) {
  const [modo, setModo] = useState('login')
  const [datos, setDatos] = useState(vacio)
  const [error, setError] = useState('')

  function cambiar(e) {
    setDatos(previo => ({ ...previo, [e.target.name]: e.target.value }))
    setError('')
  }

  function cambiarModo(nuevoModo) {
    setModo(nuevoModo)
    setDatos(vacio)
    setError('')
  }

  function validar() {
    if (campos.some(c => !datos[c.name]?.trim())) return 'Complete todos los campos'
    if (!/^\d{5,15}$/.test(datos.documento.trim())) return 'Ingrese un documento válido (5 a 15 números)'
    if (!/^\d{7,15}$/.test(datos.telefono.trim())) return 'Ingrese un teléfono válido (7 a 15 números)'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())) return 'Ingrese un correo válido'
    if (!/^\d{4}-\d{2}-\d{2}$/.test(datos.fechaNacimiento) || datos.fechaNacimiento > fechaLocal()) return 'Ingrese una fecha de nacimiento válida'
    if (datos.contrasena.length < 8) return 'La contraseña debe tener mínimo 8 caracteres'
    if (!/[A-Z]/.test(datos.contrasena)) return 'La contraseña debe tener una mayúscula'
    if (!/[a-z]/.test(datos.contrasena)) return 'La contraseña debe tener una minúscula'
    if (!/\d/.test(datos.contrasena)) return 'La contraseña debe tener un número'
    if (datos.contrasena !== datos.confirmar) return 'Las contraseñas no coinciden'
    return ''
  }

  function registrar() {
    const mensaje = validar()
    if (mensaje) return setError(mensaje)
    const usuarios = leerJSON('usuarios', [])
    if (!Array.isArray(usuarios)) return setError('Los datos guardados no son válidos')
    const correo = datos.correo.trim().toLowerCase()
    if (usuarios.some(u => u.correo?.toLowerCase() === correo || u.documento === datos.documento.trim())) {
      return setError('El correo o documento ya está registrado')
    }
    const nuevo = { ...datos, nombre: datos.nombre.trim(), documento: datos.documento.trim(), correo, telefono: datos.telefono.trim(), direccion: datos.direccion.trim() }
    delete nuevo.confirmar
    // Prototipo educativo: NO usar contraseñas ni datos personales reales.
    if (!guardarJSON('usuarios', [...usuarios, nuevo])) return setError('No fue posible guardar el registro')
    alert('Registro exitoso, ahora inicie sesión')
    setModo('login')
    setDatos({ ...vacio, correo })
    setError('')
  }

  function iniciar() {
    if (!datos.correo.trim() || !datos.contrasena) return setError('Ingrese correo y contraseña')
    const usuarios = leerJSON('usuarios', [])
    if (!Array.isArray(usuarios)) return setError('No se pudieron leer los usuarios')
    const usuario = usuarios.find(u => u.correo?.toLowerCase() === datos.correo.trim().toLowerCase() && u.contrasena === datos.contrasena)
    if (!usuario) return setError('Correo o contraseña incorrectos')
    const sinClave = { ...usuario }
    delete sinClave.contrasena
    onIniciarSesion(sinClave)
  }

  const camposVisibles = modo === 'login' ? campos.filter(c => c.name === 'correo') : campos
  return { modo, datos, error, camposVisibles, cambiar, cambiarModo, enviar: modo === 'login' ? iniciar : registrar }
}
