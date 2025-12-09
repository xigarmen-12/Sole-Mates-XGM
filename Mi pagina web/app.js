// =========================================================
// DEFINICIÓN DE COLORES CONSISTENTES CON EL CSS
// =========================================================
const COLORES = {
    BRAND_PRIMARY: '#5200CC', // Púrpura/Magenta Vibrante
    SUCCESS: '#45BF55', // Verde de Éxito
    WARNING: '#FFC700', // Amarillo de Alerta
    BACKGROUND_LIGHT: '#F7F7F7', // Gris muy claro para fondos/bordes
    TEXT_DARK: '#111111', // Texto principal
    BACKGROUND_WHITE: '#FFFFFF' 
};

// =========================================================
// 👟 MOCK API (SIMULACIÓN DE DATOS LOCALES GRATUITOS)
// =========================================================
// Esta estructura simula la respuesta que daría una API de e-commerce de zapatillas.
const DATOS_MOCK_API = [
    {
        name: "Air Jordan 1 Retro High 'Hyper Royal'",
        brand: "Nike Air Jordan",
        retailPrice: 3899,
        image: { original: "img/NikeAirJordan1.jpeg" }, // Usa una imagen local de ejemplo
        url: "#"
    },
    {
        name: "Yeezy Boost 350 V2 'Zyon'",
        brand: "Adidas Yeezy",
        retailPrice: 4200,
        image: { original: "img/YeezyBoost2.jpg" },
        url: "#"
    },
    {
        name: "New Balance 550 'Au Lait'",
        brand: "New Balance",
        retailPrice: 2199,
        image: { original: "img/NewBalance3.jpeg" },
        url: "#"
    },
    {
        name: "Chuck Taylor All Star 70s High",
        brand: "Converse",
        retailPrice: 1699,
        image: { original: "img/ChuckTaylor4.jpg" },
        url: "#"
    },
    {
        name: "Puma RS-X 'Infusion'",
        brand: "Puma",
        retailPrice: 2500,
        image: { original: "img/PumaRS5.jpg" },
        url: "#"
    },
    {
        name: "Reebok Club C 85 Vintage",
        brand: "Reebok",
        retailPrice: 1999,
        image: { original: "img/Reebok6.jpeg" },
        url: "#"
    }
];


// --- 1. Función para crear el HTML de una tarjeta (Card) ---
function crearTarjetaTenis(tenis) {
    const nombre = tenis.name || 'Modelo Desconocido';
    const marca = tenis.brand || 'Marca Genérica';
    const precio = tenis.retailPrice || 129; 
    // Usamos el camino local de la imagen
    const imagenUrl = tenis.image ? tenis.image.original : 'img/placeholder.png'; 
    
    // Formato de moneda MXN
    const precioFormateado = precio.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0 
    });

    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 shadow-sm border-0">
                <img src="${imagenUrl}" class="card-img-top imagen-api" alt="Tenis ${nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold text-truncate" title="${nombre}">${nombre}</h5>
                    <p class="card-text text-muted mb-1">${marca}</p>
                    <p class="card-text text-success fs-5 mt-auto precio-api">
                        **${precioFormateado}**
                    </p>
                    <a href="${tenis.url || '#'}" target="_blank" class="btn btn-dark mt-2">
                        Comprar en Sole Mates
                    </a>
                </div>
            </div>
        </div>
    `;
}

// --- 2. Función para inyectar el HTML en la página ---
function renderizarTenis(arrayDeTenis) {
    const contenedor = document.getElementById('contenedor-api-tenis');
    
    if (!contenedor) {
        console.error("No se encontró el contenedor con ID 'contenedor-api-tenis'");
        return;
    }

    if (arrayDeTenis && arrayDeTenis.length > 0) {
        let htmlTarjetas = '';
        arrayDeTenis.forEach(tenis => {
            htmlTarjetas += crearTarjetaTenis(tenis);
        });
        contenedor.innerHTML = htmlTarjetas;
    } else {
        contenedor.innerHTML = '<div class="col-12"><p class="text-center">No se encontraron nuevos lanzamientos en este momento.</p></div>';
    }
}

// --- 3. Función de Carga (Simulación Asíncrona) ---
async function obtenerTenisDeLaAPI() {
    console.log("Simulando la carga de tenis desde la API local...");

    // Simula el tiempo de espera que tomaría una llamada de red real (1.5 segundos)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Inyecta los datos del Mock
    renderizarTenis(DATOS_MOCK_API);
}


// =========================================================
// CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA
// =========================================================
document.addEventListener('DOMContentLoaded', () => {

    // Ejecutar la carga de datos de la API simulada al cargar la página
    obtenerTenisDeLaAPI();
    
    // =========================================================
    // 1. EVENTO ADDEVENTLISTENER (btnCambiarCard)
    // =========================================================
    const btnCambiar = document.getElementById('btnCambiarCard');
    const cardImagen = document.getElementById('cardImagen');
    const cardTitulo = document.querySelector('.cardTitulo');
    const cardTexto = document.querySelector('.cardTexto');

    if (btnCambiar && cardImagen && cardTitulo && cardTexto) {
        let esDeportivo = true; // Estado inicial

        btnCambiar.addEventListener('click', () => {
            if (esDeportivo) {
                // Estado 2: Tenis Casuales
                cardImagen.src = 'img/ImagenTenis2.png'; 
                cardImagen.alt = 'Tenis casuales';
                cardTitulo.textContent = 'Tenis Casuales para el Día a Día';
                cardTexto.textContent = 'Diseños cómodos y modernos perfectos para tu rutina diaria.';
                btnCambiar.textContent = 'Ver Deportivos';
                esDeportivo = false;
            } else {
                // Estado 1: Tenis Deportivos (Original)
                cardImagen.src = 'img/TenisDeportivos.png'; 
                cardImagen.alt = 'Tenis deportivos';
                cardTitulo.textContent = 'Tenis deportivos súper buenos';
                cardTexto.textContent = 'Ve los nuevos lanzamientos de tenis deportivos para cualquier deporte que te interese.';
                btnCambiar.textContent = 'Da click para ver';
                esDeportivo = true;
            }
        });
    }

    // =========================================================
    // 2. FUNCIONALIDAD DEL BANNER PROMOCIONAL 
    // =========================================================
    const banner = document.getElementById('banner');
    if (banner) {
        banner.style.border = `2px solid ${COLORES.BRAND_PRIMARY}`; 
        banner.style.borderRadius = '5px';
    }


    // =========================================================
    // 3. SECCIÓN NUEVOS SERVICIOS CON IA (Simulación de carrito)
    // =========================================================
    const btnSelect = document.querySelector('.btnSelect1');
    const btnRemove = document.querySelector('.btnRemove1');
    const card1 = document.getElementById('card1');
    
    if (btnSelect && btnRemove && card1) {
        btnSelect.addEventListener('click', () => {
            alert('Servicio "Análisis de datos con IA" seleccionado. Agregado al carrito.');
            // Resalta con el color de Éxito (Success)
            card1.style.border = `3px solid ${COLORES.SUCCESS}`; 
        });

        btnRemove.addEventListener('click', () => {
            alert('Servicio "Análisis de datos con IA" eliminado.');
            // Vuelve al borde sutil y claro
            card1.style.border = `1px solid ${COLORES.BACKGROUND_LIGHT}`; 
        });
    }

    // =========================================================
    // 7. AGREGAR IMÁGENES DINÁMICAS
    // =========================================================
    const inputImagen = document.getElementById("inputImagen");
    const btnAgregarImagen = document.getElementById("btnAgregarImagen");
    const galeria = document.getElementById("galeria");

    if (inputImagen && btnAgregarImagen && galeria) {

        btnAgregarImagen.addEventListener("click", function () {
            
            const url = inputImagen.value.trim();

            if (url === "") {
                alert("Por favor ingresa una URL válida.");
                return;
            }

            const col = document.createElement("div");
            col.classList.add("col-12", "col-md-4"); 

            const img = document.createElement("img");
            img.src = url;
            img.alt = "Imagen agregada por el usuario";
            img.classList.add("img-fluid", "rounded", "shadow");
            
            col.appendChild(img);
            galeria.appendChild(col);
            inputImagen.value = ""; 
        });
    }

    /* ============================================================
       ACTIVIDAD LISTA DE TAREAS WARRIOR 
    ============================================================ */
    const listaTareas = document.getElementById("listaTareas");
    const btnEliminarPrimero = document.getElementById("btnEliminarPrimero");
    const inputNuevaTarea = document.getElementById("inputNuevaTarea");
    const btnAgregarTarea = document.getElementById("btnAgregarTarea");

    if (listaTareas && btnEliminarPrimero && inputNuevaTarea && btnAgregarTarea) {
        // 2. Eliminar el primer elemento de la lista usando remove()
        btnEliminarPrimero.addEventListener("click", () => {
          const primeraTarea = listaTareas.firstElementChild;

          if (primeraTarea) {
            primeraTarea.remove(); // elimina el nodo directamente
          } else {
            alert("No hay tareas para eliminar.");
          }
        });

        // 3. Agregar nuevas tareas a la lista
        btnAgregarTarea.addEventListener("click", () => {
          const textoTarea = inputNuevaTarea.value.trim();

          if (textoTarea === "") {
            alert("Escribe una tarea antes de agregar.");
            return;
          }

          // Crear nueva tarea (li)
          const nuevaTarea = document.createElement("li");
          nuevaTarea.classList.add("list-group-item");
          nuevaTarea.innerText = textoTarea;

          // Insertar en la lista
          listaTareas.appendChild(nuevaTarea);

          inputNuevaTarea.value = ""; // limpiar input
        });
    }

});

// =========================================================
// FUNCIONES GLOBALES (Llamadas directamente desde el HTML)
// =========================================================

// =========================================================
// 4. EVENTO ONCLICK (Haz clic para saludar)
// =========================================================
function saludar() {
    const elementoMensaje = document.getElementById('mensajeOnclick');
    if (elementoMensaje) {
        elementoMensaje.textContent = '¡Hola! Gracias por visitar Sole Mates XGM.';
        elementoMensaje.style.color = COLORES.SUCCESS; 
    }
}

// =========================================================
// 5. EVENTO ONMOUSEOVER / ONMOUSEOUT
// =========================================================
function cambiarColor() {
    const cuadro = document.getElementById('cuadroColor');
    if (cuadro) {
        cuadro.style.backgroundColor = COLORES.BRAND_PRIMARY; 
        cuadro.style.color = COLORES.BACKGROUND_WHITE; 
        cuadro.textContent = '¡Ofertas esperando tu carrito!';
    }
}

function restaurarColor() {
    const cuadro = document.getElementById('cuadroColor');
    if (cuadro) {
        cuadro.style.backgroundColor = COLORES.BACKGROUND_LIGHT; 
        cuadro.style.color = COLORES.TEXT_DARK;
        cuadro.textContent = 'Pasa el cursor por aquí';
    }
}

// =========================================================
// 6. EVENTO ONCHANGE
// =========================================================
function mostrarSeleccionEjemplo() {
    const select = document.getElementById('selectEjemplo');
    const textoMensaje = document.getElementById('textoOnchange');

    if (select && textoMensaje) {
        const valorSeleccionado = select.value;
        
        if (valorSeleccionado) {
            textoMensaje.textContent = `Has seleccionado ver: ${valorSeleccionado}`;
        } else {
            textoMensaje.textContent = 'Por favor, selecciona una categoría.';
        }
    }
}