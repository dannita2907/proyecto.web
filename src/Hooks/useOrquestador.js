import {useState } from 'react';
import useTarjeta from './useTarjeta';
import datosTarjetas from '../data/tarjetas.json';

export default function useOrquestador() {
    const [pantalla, setPantalla]= useState('ingreso');
    const [pestana, setPestana]= useState('bienestar');
    const [epsNombre, setEpsNombre]= useState(localStorage.getItem('epsNombre') || '');
    const [sede, setSede]= useState(localStorage.getItem('sede') || '');
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuarioActivo')));

    const {tarjeta, agregar} = useTarjeta(datosTarjetas);

    function irA(nuevaPantalla, nuevaPestana) {
        if (nuevaPestana) setPestana(nuevaPestana)
            setPantalla(nuevaPantalla)
    }

    function ingresar(nombre, sedeElegida) {
        setEpsNombre(nombre)
        setSede(sedeElegida)
        localStorage.setItem('epsNombre', nombre)
        localStorage.setItem('sede', sedeElegida)
        setPantalla('home')
    }

    function iniciarSesion (usuyarioNuevo) {
        setUsuario(usuarioNuevo)
        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioNuevo))
        setPantalla('servicios')
    }

    function cerrarSesion() {
        setUsuario(null)
        localStorage.removeItem('usuarioActivo')
        setPantalla('home')
    }

    function actualizarUsuario(datosNuevos) {
        const usuarioNuevo = {...usuario, ...datosNuevos}
        setUsuario(usuarioNuevo)
        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioNuevo))
        const usuarios =JSON.parse(localStorage.getItem('usuarios')) || []
        const actualizados = usuarios.map((u) => (u.correo === usuario.correo ? { ...u, ...datosNuevos } : u))
        localStorage.setItem('usuarios', JSON.stringify(actualizados))
    }

    const volver = () => setPantalla('servicios')

    return {pantalla, pestana, epsNombre, sede, usuario, tarjeta, irA, ingresar, iniciarSesion, cerrarSesion, actualizarUsuario, volver, agregar};

}


