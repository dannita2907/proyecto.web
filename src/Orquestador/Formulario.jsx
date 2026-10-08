import { useState } from 'react'
import campos from '../data/camposRegistro.json'
import Campos from "../Componentes/Formulario/Campos";
import Boton from "../Componentes/Formulario/Boton";
import BotonVolver from "../Componentes/Formulario/BotonVolver";
import '../Style/formulario.css'

const vacio = {
  nombre: '', documento: '', fechaNacimiento: '', telefono: '',
  direccion: '', correo: '', contrasena: '', confirmar: '',
}

function Formulario({ onIniciarSesion, onVolver }) {
  const [modo, setModo] = useState('login') // 'login' o 'registro'
  const [datos, setDatos] = useState(vacio)
  const [error, setError] = useState('')

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function cambiarModo(nuevoModo) {
    setModo(nuevoModo)
    setError('')
  }

  function validar() {
    if (campos.some((c) => datos[c.name] === '')) return 'Complete todos los campos'
    if (!/^[0-9]+$/.test(datos.documento)) return 'El documento solo debe tener números'
    if (datos.contrasena.length < 8) return 'La contraseña debe tener mínimo 8 caracteres'
    if (!/[A-Z]/.test(datos.contrasena)) return 'La contraseña debe tener una mayúscula'
    if (!/[0-9]/.test(datos.contrasena)) return 'La contraseña debe tener un número'
    if (datos.contrasena !== datos.confirmar) return 'Las contraseñas no coinciden'
    return ''
  }

  function registrar() {
    const mensaje = validar()
    if (mensaje !== '') {
      setError(mensaje)
      return
    }
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    if (usuarios.find((u) => u.correo === datos.correo)) {
      setError('Ese correo ya está registrado')
      return
    }
    const nuevo = { ...datos }
    delete nuevo.confirmar
    usuarios.push(nuevo)
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    alert('Registro exitoso, ahora inicie sesión')
    setDatos({ ...vacio, correo: datos.correo })
    cambiarModo('login')
  }

  function iniciar() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const usuario = usuarios.find((u) => u.correo === datos.correo && u.contrasena === datos.contrasena)
    if (!usuario) {
      setError('Correo o contraseña incorrectos')
      return
    }
    const sinClave = { ...usuario }
    delete sinClave.contrasena
    onIniciarSesion(sinClave)
  }

  // En login solo se piden correo y contraseña
  const camposVisibles = modo === 'login' ? campos.filter((c) => c.name === 'correo') : campos

  return (
    <div className="pantalla fondo-medico">
      <section className="caja-formulario">
        <h2>{modo === 'login' ? 'Iniciar sesión' : 'Registro'}</h2>

        <Campos
          lista={camposVisibles}
          datos={datos}
          onCambiar={cambiar}
          registro={modo === 'registro'}
        />

        {error !== '' && <p className="error">{error}</p>}

        <Boton
          texto={modo === 'login' ? 'Ingresar' : 'Registrarme'}
          onClick={modo === 'login' ? iniciar : registrar}
        />
        <Boton
          texto={modo === 'login' ? 'Crear una cuenta' : 'Ya tengo cuenta'}
          onClick={() => cambiarModo(modo === 'login' ? 'registro' : 'login')}
          clase="boton-secundario"
        />
        <BotonVolver onClick={onVolver} />
      </section>
    </div>
  )
}

export default Formulario