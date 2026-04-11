const MINUSCULAS = 'abcdefghijklmnopqrstuvwxyz'
const MAYUSCULAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMEROS = '0123456789'
const SIMBOLOS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

export type OpcionesConjunto = {
  usarMinusculas: boolean
  usarMayusculas: boolean
  usarNumeros: boolean
  usarSimbolos: boolean
}

export type ResultadoFortaleza = {
  etiqueta: string
  porcentaje: number
  color: string
}

export function construirConjunto(opciones: OpcionesConjunto): string {
  let conjunto = ''
  if (opciones.usarMinusculas) conjunto += MINUSCULAS
  if (opciones.usarMayusculas) conjunto += MAYUSCULAS
  if (opciones.usarNumeros) conjunto += NUMEROS
  if (opciones.usarSimbolos) conjunto += SIMBOLOS
  return conjunto
}

function obtenerIndiceSeguro(maximo: number): number {
  const limite = 256 - (256 % maximo)
  const bytes = new Uint8Array(1)
  do {
    crypto.getRandomValues(bytes)
  } while (bytes[0] >= limite)
  return bytes[0] % maximo
}

export function generarContrasena(
  longitud: number,
  opciones: OpcionesConjunto,
): string {
  const conjunto = construirConjunto(opciones)
  if (conjunto.length === 0) {
    throw new Error(
      'Selecciona al menos un tipo de carácter (minúsculas, mayúsculas, números o símbolos).',
    )
  }
  let resultado = ''
  for (let i = 0; i < longitud; i++) {
    const indice = obtenerIndiceSeguro(conjunto.length)
    resultado += conjunto[indice]
  }
  return resultado
}

export function calcularFortaleza(contrasena: string): ResultadoFortaleza {
  if (!contrasena) {
    return { etiqueta: '—', porcentaje: 0, color: '#64748b' }
  }
  let puntuacion = 0
  const longitud = contrasena.length
  if (longitud >= 8) puntuacion += 15
  if (longitud >= 12) puntuacion += 15
  if (longitud >= 16) puntuacion += 10
  if (longitud >= 24) puntuacion += 10
  if (longitud >= 32) puntuacion += 10
  const tieneMinus = /[a-z]/.test(contrasena)
  const tieneMayus = /[A-Z]/.test(contrasena)
  const tieneNum = /[0-9]/.test(contrasena)
  const tieneSim = /[^a-zA-Z0-9]/.test(contrasena)
  const tipos = [tieneMinus, tieneMayus, tieneNum, tieneSim].filter(Boolean)
    .length
  puntuacion += tipos * 10
  const variedad = new Set(contrasena.split('')).size / longitud
  puntuacion += Math.round(variedad * 20)
  puntuacion = Math.min(100, puntuacion)
  if (puntuacion < 25) {
    return { etiqueta: 'Muy débil', porcentaje: puntuacion, color: '#f87171' }
  }
  if (puntuacion < 45) {
    return { etiqueta: 'Débil', porcentaje: puntuacion, color: '#fb923c' }
  }
  if (puntuacion < 65) {
    return { etiqueta: 'Media', porcentaje: puntuacion, color: '#fbbf24' }
  }
  if (puntuacion < 85) {
    return { etiqueta: 'Fuerte', porcentaje: puntuacion, color: '#34d399' }
  }
  return { etiqueta: 'Muy fuerte', porcentaje: puntuacion, color: '#22d3ee' }
}
