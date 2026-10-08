import { useState } from 'react'
import Pantalla from '../Componentes/Pantalla.jsx'
import Campo from '../Componentes/Campo.jsx'
import Selector from '../Componentes/Selector.jsx'
import Boton from '../Componentes/Formulario/Boton.jsx'
import sedes from '../data/sedes.json'
import logo from '../asset/logo.svg'
import '../Style/ingreso.css'

function Ingreso({ onIngresar }) {
  const [nombre, setNombre] = useState('')
  const [sede, setSede] = useState('')

  function ingresar() {
    if (nombre === '' || sede === '') alert('Ingrese el nombre de la EPS y seleccione la sede')
    else onIngresar(nombre, sede)
  }

  return (
    <Pantalla fondo="pantalla-ingreso">
      <section className="caja-ingreso">
        <img src={logo} alt="Logo EPS" width="90" />
        <h2>Ingreso EPS</h2>
        <Campo etiqueta="Nombre de la EPS" valor={nombre} onCambio={setNombre} />
        <Selector etiqueta="Sede" valor={sede} opciones={sedes} vacio="Seleccione la sede" onCambio={setSede} />
        <Boton texto="Ingresar" onClick={ingresar} />
      </section>
    </Pantalla>
  )
}

export default Ingreso