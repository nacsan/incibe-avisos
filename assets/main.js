// Obtención de fuente origianl

var feedURL = 'https://www.incibe.es/empresas/avisos/feed';

// Cargamos los datos del feed facilitado y comprobamos si ha funcionado o no.

function cargarFeed() {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedURL)}`)
        .then(response => response.json())
        .then(data => {
            // Verificar si se obtuvo el feed correctamente
            if (data.status === 'ok') {
                mostrarFeed(data.items);
            } else {
                console.error('Error al obtener el feed.');
            }
        }
    )
        .catch(error => {
            console.error('Error de red:', error);
        }
    );
}

// Función para mostrar el feed en el contenedor
function mostrarFeed(items) {
    var contenedor = document.getElementById('blog-feed');

    // Crear elementos HTML para cada artículo del feed
    items.forEach(item => {
    // Crear un DIV para cada artículo del feed
    var contenedorArticulo = document.createElement('div');
    // Añadimos sus clases
    contenedorArticulo.classList.add('bg-white', 'rounded-lg', 'shadow-lg');

    //Mostramos la imagen de incibe
    var imgHeader = document.createElement('img');
    imgHeader.src = "assets/images/incibe_1.svg"
    imgHeader.classList.add('my-10')
    contenedorArticulo.appendChild(imgHeader)

    // Creamos el título
    var titulo = document.createElement('h2');
    titulo.classList.add('text-xl', 'font-bold', 'mb-2', 'p-4', 'text-red-700');
    
    //Conseguimos el link 
    var enlace = document.createElement('a');
    enlace.textContent = item.title;
    enlace.href = item.link;
    enlace.target = "_blank";
    enlace.classList.add('text-black', 'underline', 'decoration-2', 'underline-offset-2', 'hover:text-red-700', 'transition-colors', 'duration-200')

    titulo.appendChild(enlace);
    contenedorArticulo.appendChild(titulo);

    // Mostramos la fecha 
    var fecha = document.createElement('code');
    fecha.textContent = `Publicado el ${item.pubDate}`;
    fecha.classList.add('block', 'p-4', 'rounded-lg', 'text-sm', 'font-mono');
    contenedorArticulo.appendChild(fecha);

    // Mostramos parte del contenido.
    // Creamos un elemento p para añadir en formato texto el contenido de item.content
    var tempDiv = document.createElement('p');

    tempDiv.innerHTML = item.content;

    // Asignamos la variable recursos Afectados lo que este dentro de esa clase
    const recursosAfectados = tempDiv.querySelector('.field--name-field-recursos-afectados');            

/*
  Este bloque de código comprueba si el elemento 'recursosAfectados' existe en el documento.
  - Si existe, se obtiene su contenido HTML y se crea un nuevo div dinámicamente usando createElement().
    El nuevo div recibe la clase 'p-4' para aplicar un padding uniforme (útil con TailwindCSS),
    y su contenido interno se reemplaza por el HTML proveniente de 'recursosAfectados'.
    Finalmente, se añade el nuevo div dentro del contenedor llamado 'contenedorArticulo' 
    mediante el método appendChild(), que inserta el nodo al final del elemento padre.
  - Si no existe 'recursosAfectados', se crea igualmente un div con el mismo formato,
    pero con el texto "Error" en lugar del contenido original.
  En resumen, el código genera dinámicamente un mensaje o bloque de contenido dentro de
  'contenedorArticulo' dependiendo de la existencia de 'recursosAfectados'.
*/
    if(recursosAfectados){
        var htmlContent = recursosAfectados.innerHTML;
        var crearDiv = document.createElement('div');
        crearDiv.classList.add('p-4');
        
        crearDiv.innerHTML = htmlContent;
        contenedorArticulo.appendChild(crearDiv)
    } else {
        crearDiv = document.createElement('div');
        crearDiv.classList.add('p-4');
        crearDiv.innerHTML = "Error";
        contenedorArticulo.appendChild(crearDiv);

    }
// Crear un contenedor temporal para insertar el contenido HTML del item
var tempDiv = document.createElement('p');
tempDiv.innerHTML = item.content;

// Buscar dentro de ese contenido el campo con la clase 'field--name-field-importancia'
const importancia = tempDiv.querySelector('.field--name-field-importancia');

/*
  Este bloque de código busca el elemento con la clase 'field--name-field-importancia' 
  dentro del contenido obtenido desde la API y muestra su contenido en un contenedor visual destacado.
  - Si el elemento existe, se toma su HTML y se coloca dentro de un div estilizado con TailwindCSS
    usando una paleta basada en tonos rojos para destacar la importancia.
  - Si no se encuentra el campo, se muestra un bloque en tono rosado indicando que no hay datos disponibles.
*/

if (importancia) {
    var htmlContent = importancia.innerHTML;

    var tituloImportancia = document.createElement('h3');
    tituloImportancia.textContent = "Nivel de importancia";
    tituloImportancia.classList.add('text-lg', 'font-bold', 'mb-2','p-4');


    var crearDiv = document.createElement('div');
    crearDiv.classList.add(
        'm-4',
        'p-4',
        'rounded-lg',
        'bg-red-100',
        'text-red-900',
        'border-l-4',
        'border-red-600',
        'my-2',
        'shadow-sm'
    );
    crearDiv.innerHTML = htmlContent;

    contenedorArticulo.append(tituloImportancia);
    contenedorArticulo.appendChild(crearDiv);
} else {
    var crearDiv = document.createElement('div');
    crearDiv.classList.add(
        'p-4',
        'rounded-lg',
        'bg-red-50',
        'text-red-700',
        'italic',
        'my-2'
    );
    crearDiv.textContent = 'Sin datos de importancia.';

    contenedorArticulo.appendChild(crearDiv);
}


    

    // Agregar el contenedor del artículo al contenedor principal
    contenedor.appendChild(contenedorArticulo);
    });
}
