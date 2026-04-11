# Contribución y convención de commits

## Mensajes de commit

Formato inspirado en [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<ámbito opcional>): <descripción en imperativo>

[cuerpo opcional]
```

### Tipos habituales

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de error |
| `docs` | Documentación |
| `chore` | Mantenimiento (dependencias, tooling) |
| `ci` | Integración continua / workflows |
| `test` | Pruebas |
| `refactor` | Refactor sin cambio de comportamiento |

### Ejemplos

- `feat(ui): añadir historial de contraseñas`
- `fix: validar conjunto vacío al generar`
- `ci: añadir workflow de verificación en PR`
- `test: cubrir generación con conjunto mínimo`

Usa mensajes en español o inglés de forma consistente en el equipo. La primera línea no debe superar ~72 caracteres cuando sea posible.

## Ramas y PR

Seguir `docs/GITFLOW.md`. Las integraciones a `main` y `develop` se hacen mediante pull requests.

## Comprobaciones locales

Antes de abrir o actualizar un PR:

```bash
npm run lint
npm run test
npm run build
```
