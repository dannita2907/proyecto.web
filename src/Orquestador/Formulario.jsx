import useFormulario from '../Hooks/useFormulario.js'
import Campos from '../Componentes/Formulario/Campos'
import Boton from '../Componentes/Formulario/Boton'
import BotonVolver from '../Componentes/Formulario/BotonVolver'
import '../Style/formulario.css'

function Formulario({ onIniciarSesion, onVolver }) {
  const { modo, datos, error, camposVisibles, cambiar, cambiarModo, registrar, iniciar } =
    useFormulario(onIniciarSesion)

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