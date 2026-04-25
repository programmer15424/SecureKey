import { describe, expect, it } from 'vitest'
import { HistorialOrm, type AlmacenHistorial } from './historialOrm.ts'

function crearAlmacen(): AlmacenHistorial {
  const datos = new Map<string, string>()

  return {
    getItem: (clave) => datos.get(clave) ?? null,
    setItem: (clave, valor) => datos.set(clave, valor),
    removeItem: (clave) => datos.delete(clave),
  }
}

describe('HistorialOrm', () => {
  it('guarda y lista contraseñas recientes primero', async () => {
    const orm = new HistorialOrm(crearAlmacen())

    await orm.crear('primera')
    await orm.crear('segunda')

    const registros = await orm.listar()

    expect(registros).toHaveLength(2)
    expect(registros.map((registro) => registro.valor)).toEqual([
      'segunda',
      'primera',
    ])
  })

  it('limita el historial al máximo configurado', async () => {
    const orm = new HistorialOrm(crearAlmacen(), 'test', 3)

    await orm.crear('uno')
    await orm.crear('dos')
    await orm.crear('tres')
    await orm.crear('cuatro')

    const registros = await orm.listar()

    expect(registros.map((registro) => registro.valor)).toEqual([
      'cuatro',
      'tres',
      'dos',
    ])
  })

  it('limpia el historial', async () => {
    const orm = new HistorialOrm(crearAlmacen())

    await orm.crear('temporal')
    await orm.limpiar()

    expect(await orm.listar()).toEqual([])
  })
})
