// Almacenamiento local exclusivo de la demostración académica.
// No utilizar para datos médicos ni contraseñas reales.
export function leerJSON(clave, respaldo) {
  try {
    const texto = window.localStorage.getItem(clave)
    const valor = texto === null ? respaldo : JSON.parse(texto)
    return valor ?? respaldo
  } catch {
    return respaldo
  }
}

export function guardarJSON(clave, valor) {
  try {
    window.localStorage.setItem(clave, JSON.stringify(valor))
    return true
  } catch {
    return false
  }
}

export function leerTexto(clave, respaldo = '') {
  try {
    return window.localStorage.getItem(clave) ?? respaldo
  } catch {
    return respaldo
  }
}

export function guardarTexto(clave, valor) {
  try {
    window.localStorage.setItem(clave, valor)
    return true
  } catch {
    return false
  }
}

export function eliminar(clave) {
  try {
    window.localStorage.removeItem(clave)
    return true
  } catch {
    return false
  }
}
