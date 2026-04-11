# GitFlow en SecureKey

Repositorio: [https://github.com/programmer15424/SecureKey](https://github.com/programmer15424/SecureKey)

## Ramas

| Rama | Uso |
|------|-----|
| `main` | Producción estable. Solo integración vía PR desde `release/*` o `hotfix/*`. Despliegue automático con GitHub Actions. |
| `develop` | Integración continua de features. Base para nuevas funcionalidades. |
| `feature/*` | Desarrollo de funcionalidades. Se abre desde `develop` y se fusiona en `develop` vía PR. |
| `release/*` | Congelación y ajustes finales antes de publicar. Se abre desde `develop`, se fusiona en `main` y de vuelta en `develop`. |
| `hotfix/*` | Correcciones urgentes en producción. Se abre desde `main`, se fusiona en `main` y en `develop`. |

## Flujo con pull requests

1. Crear la rama desde la base adecuada (`develop` o `main` para hotfix).
2. Hacer commits con el formato descrito en `CONTRIBUTING.md`.
3. Subir la rama y abrir un PR hacia `develop` (o `main` en hotfix/release según el caso).
4. Esperar revisión y que el workflow CI pase (lint, tests, build).
5. Resolver comentarios; si hay conflictos con la base, actualizar la rama (merge o rebase según convención del equipo) y volver a ejecutar pruebas localmente antes de fusionar.

## Resolución de conflictos

1. Actualizar la rama local con la base (`git fetch origin` y merge o rebase de `origin/develop` u `origin/main`).
2. Resolver archivos marcados por Git, manteniendo coherencia con la revisión previa.
3. Ejecutar `npm run lint`, `npm run test` y `npm run build`.
4. Subir los cambios y comprobar que el PR vuelve a estar verde en CI.
5. Pedir una nueva revisión si el diff relevante cambió.

La revisión de código y las comprobaciones automáticas reducen regresiones antes de fusionar.

## Configuración recomendada en GitHub

En **Settings → Branches** se pueden añadir reglas para exigir PR, revisiones y comprobaciones de estado (`CI`) antes de merge en `main` y `develop`.

## GitHub Pages

Tras cada push a `main`, el workflow despliega el sitio estático generado por Vite. Activa **Pages** en el repositorio (origen: **GitHub Actions**) si aún no está configurado.
