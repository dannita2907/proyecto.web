import { useId } from 'react'
export default function Selector({ etiqueta, valor, opciones, vacio = 'Seleccione', onCambio }) {
  const id = useId()
  return <div><label htmlFor={id}>{etiqueta}</label><select id={id} value={valor} onChange={e => onCambio(e.target.value)}><option value="">{vacio}</option>{opciones.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
}
