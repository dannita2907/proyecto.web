import {useState} from 'react';

export default function useTarjeta(datosIniciales) {
    const [tarjeta, setTarjeta] = useState(datosIniciales);

    const agregar = (nueva) => setTarjeta([...tarjeta, nueva]);

    return {tarjeta, agregar};

}