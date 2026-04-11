import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  calcularFortaleza,
  construirConjunto,
  generarContrasena,
} from './password.ts'

describe('construirConjunto', () => {
  it('incluye solo los tipos activados', () => {
    const s = construirConjunto({
      usarMinusculas: true,
      usarMayusculas: false,
      usarNumeros: true,
      usarSimbolos: false,
    })
    expect(s).toMatch(/^[a-z0-9]+$/)
    expect(s).toContain('a')
    expect(s).toContain('0')
  })

  it('devuelve cadena vacía si nada está activado', () => {
    expect(
      construirConjunto({
        usarMinusculas: false,
        usarMayusculas: false,
        usarNumeros: false,
        usarSimbolos: false,
      }),
    ).toBe('')
  })
})

describe('generarContrasena', () => {
  const opcionesOk = {
    usarMinusculas: true,
    usarMayusculas: false,
    usarNumeros: false,
    usarSimbolos: false,
  }

  beforeEach(() => {
    let n = 0
    vi.stubGlobal('crypto', {
      getRandomValues: (arr: Uint8Array) => {
        arr[0] = n % 200
        n += 17
        return arr
      },
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('lanza si el conjunto es vacío', () => {
    expect(() =>
      generarContrasena(8, {
        usarMinusculas: false,
        usarMayusculas: false,
        usarNumeros: false,
        usarSimbolos: false,
      }),
    ).toThrow()
  })

  it('genera la longitud pedida con caracteres del conjunto', () => {
    const pwd = generarContrasena(12, opcionesOk)
    expect(pwd).toHaveLength(12)
    expect(pwd).toMatch(/^[a-z]+$/)
  })
})

describe('calcularFortaleza', () => {
  it('vacío devuelve estado neutro', () => {
    const r = calcularFortaleza('')
    expect(r.porcentaje).toBe(0)
    expect(r.etiqueta).toBe('—')
  })

  it('clasifica contraseña larga y variada', () => {
    const r = calcularFortaleza('Ab1!abcdefghijklmn')
    expect(r.porcentaje).toBeGreaterThan(40)
    expect(r.etiqueta).not.toBe('—')
  })
})
