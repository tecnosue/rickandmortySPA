// Referencias a los elementos del dom
const botonBuscar = document.getElementById('botonBuscar');
const entradaBusqueda = document.getElementById('entradaBusqueda');
const filtroEstado = document.getElementById('filtroEstado');
const filtroGenero = document.getElementById('filtroGenero');
const contenedorResultados = document.getElementById('resultados');

//evento para el botón buscar
botonBuscar.addEventListener('click', () => {
  // Obtenemos los valores introducidos por el usuario
  const nombre = entradaBusqueda.value.trim();
  const estado = filtroEstado.value;
  const genero = filtroGenero.value;

  // Construimos la URL de consulta con filtros activos
  let url = `https://rickandmortyapi.com/api/character/?`;

  if (nombre) url += `name=${encodeURIComponent(nombre)}&`;
  if (estado) url += `status=${estado}&`;
  if (genero) url += `gender=${genero}`;

  // Hacemos la petición a la API con fetch
  fetch(url)
    .then(respuesta => {
      // Aquí 'respuesta' es el objeto HTTP bruto (headers, status, etc.)
      if (!respuesta.ok) throw new Error('No se encontraron resultados');
      return respuesta.json();// <- Aquí convertimos la respuesta a un objeto JavaScript (JSON)
    })
    .then(datos => {

      // Aquí 'datos' ya es un objeto con .results, .info, etc.
      mostrarResultados(datos.results);
    })
    .catch(error => {
      contenedorResultados.innerHTML = `<p>${error.message}</p>`;
    });
});

// Función que muestra los personajes en el HTML
function mostrarResultados(personajes) {
  contenedorResultados.innerHTML = ''; // Limpiamos resultados anteriores

  //creamos dinamicamente una tarjeta para cada personaje 
  personajes.forEach(personaje => {
    //creamos un div con la clase card
    const tarjeta = document.createElement('div');
    tarjeta.className = 'card';

    //dentro del div añadimos img, h3 (nombre) y dos parrafos paraestado y genero
    tarjeta.innerHTML = `
      <img src="${personaje.image}" alt="${personaje.name}">
      <h3>${personaje.name}</h3>
      <p><strong>Estado:</strong> ${personaje.status}</p>
      <p><strong>Género:</strong> ${personaje.gender}</p>
      <p><strong>Género:</strong> Cargando...</p>
    `;

    // añadimos la tarjeta al div resultados
    contenedorResultados.appendChild(tarjeta);

    //encadenamos otra peticion
    fetch(personaje.origin.url)
    .then(res=> res.json())
    .then(origen=> {
      //reemplazamos el texto "cargando..." 
      const parrafoOrigen = tarjeta.querySelectorAll('p')[2];
      parrafoOrigen.innerHTML = `<strong>Origen:</strong> ${origen.name} (${origen.dimension})`;
    })
    .catch(()=>{
      const parrafoOrigen = tarjeta.querySelectorAll('p')[2];
      parrafoOrigen.innerHTML = `<strong>Origen:</strong> Información no disponible`;

    });

    console.log('personaje', personaje)



  });
}
