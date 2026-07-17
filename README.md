# Rick and Morty SPA

Aplicación web de una sola página (SPA) desarrollada con HTML, CSS y JavaScript puro.

Consulta en tiempo real la API pública de Rick and Morty y permite buscar personajes de forma dinámica mediante:

- Búsqueda por nombre
- Filtro por estado (vivo, muerto, desconocido)
- Filtro por género (masculino, femenino, sin género)

## Características técnicas

- Peticiones AJAX asíncronas usando `fetch`
- Encadenamiento de peticiones para obtener detalles del planeta de origen de cada personaje
- Resultados dinámicos sin recargar la página
- Diseño responsive y ligero

## Encadenamiento de peticiones

Después de obtener los personajes, la app hace una segunda petición para obtener información del planeta de origen a partir de `character.origin.url`.

```js
fetch(personaje.origin.url)
  .then(res => res.json())
  .then(origen => {
    // mostrar información del origen
  });
```

https://tecnosue.github.io/rickandmortySPA/
