import Campos from './Campos'
import Boton from './Boton'
import BotonVolver from './BotonVolver'
import '../../Style/formulario.css'

function Formulario({ modo, datos, error, camposVisibles, onChange, onSubmit, onCambiarModo, onVolver }) {
  return (
    <div className="pantalla fondo-medico">
      <section className="caja-formulario">
        <h2>{modo === 'login' ? 'Iniciar sesión' : 'Registro'}</h2>

        <Campos
          lista={camposVisibles}
          datos={datos}
          onCambiar={onChange}
          registro={modo === 'registro'}
        />

        {error !== '' && <p className="error">{error}</p>}

        <Boton
          texto={modo === 'login' ? 'Ingresar' : 'Registrarme'}
          onClick={onSubmit}
        />
        <Boton
          texto={modo === 'login' ? 'Crear una cuenta' : 'Ya tengo cuenta'}
          onClick={() => onCambiarModo(modo === 'login' ? 'registro' : 'login')}
          clase="boton-secundario"
        />
        <BotonVolver onClick={onVolver} />
      </section>
    </div>
  )
}

export default Formulario