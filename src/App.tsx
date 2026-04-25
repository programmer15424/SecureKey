import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import {
  calcularFortaleza,
  generarContrasena,
  type OpcionesConjunto,
} from './password.ts'
import { HistorialOrm } from './historialOrm.ts'

const estilos: Record<string, CSSProperties> = {
  contenedor: {
    minHeight: '100vh',
    boxSizing: 'border-box',
    padding: '2rem 1.25rem',
    fontFamily:
      "'JetBrains Mono', ui-monospace, 'Cascadia Code', 'Consolas', monospace",
    background:
      'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(124, 58, 237, 0.25), transparent), #0a0a0f',
    color: '#c4b5fd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  marco: {
    width: '100%',
    maxWidth: 520,
    border: '1px solid rgba(139, 92, 246, 0.45)',
    borderRadius: 8,
    background: 'rgba(15, 15, 24, 0.92)',
    boxShadow:
      '0 0 0 1px rgba(59, 130, 246, 0.15), 0 24px 48px -12px rgba(0, 0, 0, 0.65)',
    overflow: 'hidden',
  },
  barraTitulo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 14px',
    background: 'linear-gradient(90deg, #1e1b4b 0%, #0f172a 100%)',
    borderBottom: '1px solid rgba(99, 102, 241, 0.35)',
    fontSize: 12,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: '#a5b4fc',
  },
  punto: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: '#6366f1',
    boxShadow: '0 0 8px rgba(99, 102, 241, 0.8)',
  },
  cuerpo: {
    padding: '1.25rem 1.35rem 1.5rem',
  },
  titulo: {
    margin: '0 0 1rem',
    fontSize: '1.35rem',
    fontWeight: 600,
    color: '#e9d5ff',
    letterSpacing: '-0.02em',
  },
  subtitulo: {
    margin: '0 0 1.25rem',
    fontSize: 12,
    color: '#818cf8',
    opacity: 0.9,
  },
  etiqueta: {
    display: 'block',
    fontSize: 11,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: '#7c3aed',
    marginBottom: 8,
  },
  filaSlider: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: '1.25rem',
  },
  valorLongitud: {
    minWidth: 36,
    textAlign: 'center' as const,
    fontSize: 14,
    color: '#38bdf8',
    fontVariantNumeric: 'tabular-nums' as const,
  },
  slider: {
    flex: 1,
    accentColor: '#8b5cf6',
    height: 6,
  },
  rejillaOpciones: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
    marginBottom: '1.25rem',
  },
  toggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    padding: '10px 12px',
    borderRadius: 6,
    border: '1px solid rgba(79, 70, 229, 0.35)',
    background: 'rgba(30, 27, 75, 0.4)',
    cursor: 'pointer',
    fontSize: 13,
    color: '#ddd6fe',
  },
  toggleTexto: {
    userSelect: 'none' as const,
  },
  switch: {
    width: 40,
    height: 22,
    borderRadius: 11,
    background: '#312e81',
    position: 'relative' as const,
    flexShrink: 0,
    transition: 'background 0.2s',
  },
  switchActivo: {
    background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
  },
  switchPunto: {
    position: 'absolute' as const,
    top: 3,
    left: 3,
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: '#f5f3ff',
    transition: 'transform 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
  },
  switchPuntoActivo: {
    transform: 'translateX(18px)',
  },
  salida: {
    fontFamily: 'inherit',
    fontSize: 15,
    padding: '14px 16px',
    borderRadius: 6,
    border: '1px solid rgba(59, 130, 246, 0.4)',
    background: '#020617',
    color: '#e0e7ff',
    wordBreak: 'break-all' as const,
    minHeight: 52,
    marginBottom: 12,
    lineHeight: 1.45,
  },
  filaFortaleza: {
    marginBottom: '1rem',
  },
  barraExt: {
    height: 8,
    borderRadius: 4,
    background: '#1e293b',
    overflow: 'hidden',
    marginBottom: 6,
  },
  barraInt: {
    height: '100%',
    borderRadius: 4,
    transition: 'width 0.35s ease, background 0.35s ease',
  },
  metaFortaleza: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 11,
    color: '#94a3b8',
  },
  botones: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap' as const,
    marginBottom: '1.25rem',
  },
  btnPrimario: {
    flex: '1 1 140px',
    padding: '12px 18px',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    color: '#f5f3ff',
    background: 'linear-gradient(135deg, #6d28d9 0%, #2563eb 100%)',
    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.45)',
  },
  btnSecundario: {
    flex: '1 1 120px',
    padding: '12px 18px',
    border: '1px solid rgba(96, 165, 250, 0.5)',
    borderRadius: 6,
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 13,
    fontWeight: 500,
    color: '#93c5fd',
    background: 'rgba(15, 23, 42, 0.8)',
  },
  btnSecundarioDeshabilitado: {
    opacity: 0.45,
    cursor: 'not-allowed',
  },
  error: {
    padding: '10px 12px',
    borderRadius: 6,
    fontSize: 12,
    marginBottom: 12,
    border: '1px solid rgba(248, 113, 113, 0.45)',
    background: 'rgba(127, 29, 29, 0.25)',
    color: '#fecaca',
  },
  exito: {
    padding: '8px 12px',
    borderRadius: 6,
    fontSize: 12,
    marginBottom: 12,
    border: '1px solid rgba(52, 211, 153, 0.4)',
    background: 'rgba(6, 78, 59, 0.3)',
    color: '#a7f3d0',
  },
  seccionHistorial: {
    borderTop: '1px solid rgba(99, 102, 241, 0.25)',
    paddingTop: '1rem',
  },
  listaHistorial: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
  },
  itemHistorial: {
    fontSize: 12,
    padding: '8px 10px',
    borderRadius: 4,
    background: 'rgba(15, 23, 42, 0.85)',
    border: '1px solid rgba(51, 65, 85, 0.6)',
    color: '#cbd5e1',
    wordBreak: 'break-all' as const,
    fontFamily: 'inherit',
  },
  vacioHistorial: {
    fontSize: 12,
    color: '#64748b',
    fontStyle: 'italic',
  },
}

function SecureKey() {
  const [longitud, setLongitud] = useState(16)
  const [usarMinusculas, setUsarMinusculas] = useState(true)
  const [usarMayusculas, setUsarMayusculas] = useState(true)
  const [usarNumeros, setUsarNumeros] = useState(true)
  const [usarSimbolos, setUsarSimbolos] = useState(true)
  const [contrasenaActual, setContrasenaActual] = useState('')
  const [historial, setHistorial] = useState<string[]>([])
  const [errorGeneracion, setErrorGeneracion] = useState<string | null>(null)
  const [errorPortapapeles, setErrorPortapapeles] = useState<string | null>(null)
  const [copiadoOk, setCopiadoOk] = useState(false)
  const historialOrm = useMemo(() => new HistorialOrm(window.localStorage), [])

  const opcionesConjunto: OpcionesConjunto = useMemo(
    () => ({
      usarMinusculas,
      usarMayusculas,
      usarNumeros,
      usarSimbolos,
    }),
    [usarMinusculas, usarMayusculas, usarNumeros, usarSimbolos],
  )

  const fortaleza = useMemo(
    () => calcularFortaleza(contrasenaActual),
    [contrasenaActual],
  )

  useEffect(() => {
    historialOrm
      .listar()
      .then((registros) =>
        setHistorial(registros.map((registro) => registro.valor)),
      )
      .catch(() => setHistorial([]))
  }, [historialOrm])

  const manejarGenerar = useCallback(async () => {
    setErrorGeneracion(null)
    setCopiadoOk(false)
    try {
      const nueva = generarContrasena(longitud, opcionesConjunto)
      await historialOrm.crear(nueva)
      const registros = await historialOrm.listar()
      setContrasenaActual(nueva)
      setHistorial(registros.map((registro) => registro.valor))
    } catch (e) {
      setErrorGeneracion(e instanceof Error ? e.message : 'Error al generar.')
    }
  }, [historialOrm, longitud, opcionesConjunto])

  const manejarCopiar = useCallback(async () => {
    if (!contrasenaActual) return
    setErrorPortapapeles(null)
    setCopiadoOk(false)
    try {
      await navigator.clipboard.writeText(contrasenaActual)
      setCopiadoOk(true)
    } catch (e) {
      const mensaje =
        e instanceof Error
          ? e.message
          : 'No se pudo acceder al portapapeles.'
      setErrorPortapapeles(mensaje)
    }
  }, [contrasenaActual])

  return (
    <div style={estilos.contenedor}>
      <div style={estilos.marco}>
        <div style={estilos.barraTitulo}>
          <span style={estilos.punto} aria-hidden />
          <span>SecureKey — generador seguro</span>
        </div>
        <div style={estilos.cuerpo}>
          <h1 style={estilos.titulo}>SecureKey</h1>
          <p style={estilos.subtitulo}>
            Aleatoriedad criptográfica (crypto.getRandomValues)
          </p>

          <label style={estilos.etiqueta} htmlFor="longitud">
            Longitud
          </label>
          <div style={estilos.filaSlider}>
            <input
              id="longitud"
              type="range"
              min={6}
              max={64}
              value={longitud}
              onChange={(e) => setLongitud(Number(e.target.value))}
              style={estilos.slider}
            />
            <span style={estilos.valorLongitud}>{longitud}</span>
          </div>

          <span style={estilos.etiqueta}>Tipos de caracteres</span>
          <div style={estilos.rejillaOpciones}>
            <button
              type="button"
              style={estilos.toggle}
              onClick={() => setUsarMinusculas((v) => !v)}
            >
              <span style={estilos.toggleTexto}>Minúsculas (a-z)</span>
              <span
                style={{
                  ...estilos.switch,
                  ...(usarMinusculas ? estilos.switchActivo : {}),
                }}
              >
                <span
                  style={{
                    ...estilos.switchPunto,
                    ...(usarMinusculas ? estilos.switchPuntoActivo : {}),
                  }}
                />
              </span>
            </button>
            <button
              type="button"
              style={estilos.toggle}
              onClick={() => setUsarMayusculas((v) => !v)}
            >
              <span style={estilos.toggleTexto}>Mayúsculas (A-Z)</span>
              <span
                style={{
                  ...estilos.switch,
                  ...(usarMayusculas ? estilos.switchActivo : {}),
                }}
              >
                <span
                  style={{
                    ...estilos.switchPunto,
                    ...(usarMayusculas ? estilos.switchPuntoActivo : {}),
                  }}
                />
              </span>
            </button>
            <button
              type="button"
              style={estilos.toggle}
              onClick={() => setUsarNumeros((v) => !v)}
            >
              <span style={estilos.toggleTexto}>Números (0-9)</span>
              <span
                style={{
                  ...estilos.switch,
                  ...(usarNumeros ? estilos.switchActivo : {}),
                }}
              >
                <span
                  style={{
                    ...estilos.switchPunto,
                    ...(usarNumeros ? estilos.switchPuntoActivo : {}),
                  }}
                />
              </span>
            </button>
            <button
              type="button"
              style={estilos.toggle}
              onClick={() => setUsarSimbolos((v) => !v)}
            >
              <span style={estilos.toggleTexto}>Símbolos</span>
              <span
                style={{
                  ...estilos.switch,
                  ...(usarSimbolos ? estilos.switchActivo : {}),
                }}
              >
                <span
                  style={{
                    ...estilos.switchPunto,
                    ...(usarSimbolos ? estilos.switchPuntoActivo : {}),
                  }}
                />
              </span>
            </button>
          </div>

          {errorGeneracion ? (
            <div style={estilos.error} role="alert">
              {errorGeneracion}
            </div>
          ) : null}

          <div style={estilos.salida} aria-live="polite">
            {contrasenaActual || (
              <span style={{ color: '#475569' }}>
                Pulsa «Generar» para crear una contraseña
              </span>
            )}
          </div>

          <div style={estilos.filaFortaleza}>
            <div style={estilos.barraExt}>
              <div
                style={{
                  ...estilos.barraInt,
                  width: `${fortaleza.porcentaje}%`,
                  background: fortaleza.color,
                }}
              />
            </div>
            <div style={estilos.metaFortaleza}>
              <span>Fortaleza</span>
              <span style={{ color: fortaleza.color }}>{fortaleza.etiqueta}</span>
            </div>
          </div>

          <div style={estilos.botones}>
            <button type="button" style={estilos.btnPrimario} onClick={manejarGenerar}>
              Generar
            </button>
            <button
              type="button"
              style={{
                ...estilos.btnSecundario,
                ...(!contrasenaActual ? estilos.btnSecundarioDeshabilitado : {}),
              }}
              onClick={manejarCopiar}
              disabled={!contrasenaActual}
            >
              Copiar
            </button>
          </div>

          {errorPortapapeles ? (
            <div style={estilos.error} role="alert">
              Portapapeles: {errorPortapapeles}
            </div>
          ) : null}
          {copiadoOk ? (
            <div style={estilos.exito}>Copiado al portapapeles</div>
          ) : null}

          <div style={estilos.seccionHistorial}>
            <span style={estilos.etiqueta}>Historial (últimas 5)</span>
            {historial.length === 0 ? (
              <p style={estilos.vacioHistorial}>Aún no hay contraseñas generadas</p>
            ) : (
              <ul style={estilos.listaHistorial}>
                {historial.map((c, indice) => (
                  <li key={`${indice}-${c}`} style={estilos.itemHistorial}>
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecureKey
