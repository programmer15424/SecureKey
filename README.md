# SecureKey

Generador de contraseñas en el navegador con React, TypeScript y Vite. Usa `crypto.getRandomValues` para la aleatoriedad.

Repositorio: [github.com/programmer15424/SecureKey](https://github.com/programmer15424/SecureKey)

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run preview` | Vista previa del build |
| `npm run lint` | ESLint |
| `npm run test` | Pruebas (Vitest) |

## Flujo de trabajo y calidad

- GitFlow y ramas: [docs/GITFLOW.md](docs/GITFLOW.md)
- Convención de commits y comprobaciones locales: [CONTRIBUTING.md](CONTRIBUTING.md)
- CI en pull requests y pushes relevantes; despliegue a GitHub Pages desde `main` (configurar Pages con origen **GitHub Actions** en el repositorio).

## React Compiler

El proyecto tiene el React Compiler activado vía Babel; puede afectar tiempos de dev y build. Referencia: [documentación del compilador](https://react.dev/learn/react-compiler).
