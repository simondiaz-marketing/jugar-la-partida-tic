# Colocación de las piezas · Primer año del Profesorado TIC (ISARM)

Recurso interactivo para la jornada **«Jugar la Partida»** (4 de noviembre de 2026).
Un tablero de ajedrez vacío donde cada pieza se coloca y revela una foto con su descripción.

## Estructura

```
index.html      Pantallas (inicio, tablero, tarjeta)
css/style.css   Estilos
js/app.js       Contenido, animación e interacción
img/            Fotos (reemplazables)
```

## Uso

Abrir `index.html` en el navegador. No requiere instalación.

## Cambiar fotos y textos

- **Fotos:** reemplazar los archivos de `img/` o editar las rutas del objeto `IMG` al inicio de `js/app.js`.
- **Textos:** editar `PIEZAS` (significado de cada pieza) y `HALLAZGOS` (los 8 peones) en `js/app.js`.

## Publicar en GitHub Pages

1. Crear un repositorio y subir el contenido de esta carpeta.
2. En **Settings → Pages**, elegir la rama `main` y la carpeta `/ (root)`.
3. La página queda disponible en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.
