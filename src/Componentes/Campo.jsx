import { useId } from 'react'
export default function Campo({ etiqueta, tipo = 'text', valor, min, onCambio }) {
  const id = useId()
  return <div><label htmlFor={id}>{etiqueta}</label><input id={id} type={tipo} value={valor} min={min} onChange={e => onCambio(e.target.value)} /></div>
}
