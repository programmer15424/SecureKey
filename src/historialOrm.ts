export type AlmacenHistorial = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export type RegistroContrasena = {
  id: string
  valor: string
  creadoEn: string
}

export class HistorialOrm {
  private readonly almacen: AlmacenHistorial
  private readonly clave: string
  private readonly maximo: number

  constructor(
    almacen: AlmacenHistorial,
    clave = 'securekey:historial',
    maximo = 5,
  ) {
    this.almacen = almacen
    this.clave = clave
    this.maximo = maximo
  }

  async crear(valor: string): Promise<RegistroContrasena> {
    const registros = await this.listar()
    const registro = {
      id: `${Date.now()}-${registros.length}`,
      valor,
      creadoEn: new Date().toISOString(),
    }

    await this.guardar([registro, ...registros].slice(0, this.maximo))
    return registro
  }

  async listar(): Promise<RegistroContrasena[]> {
    const datos = this.almacen.getItem(this.clave)
    if (!datos) return []

    try {
      const registros = JSON.parse(datos) as RegistroContrasena[]
      return Array.isArray(registros) ? registros : []
    } catch {
      return []
    }
  }

  async limpiar(): Promise<void> {
    this.almacen.removeItem(this.clave)
  }

  private async guardar(registros: RegistroContrasena[]): Promise<void> {
    this.almacen.setItem(this.clave, JSON.stringify(registros))
  }
}
