import { renderHeader } from './components/header.js';
import { renderProductsList } from './components/productsList.js';
import { renderCart } from './components/cartStats.js';

const app = document.getElementById('app'); // [cite: 230]

// Función Router principal [cite: 233]
async function router() {
    // 1. Limpiar pantalla
    app.innerHTML = ''; 

    // 2. Renderizar Header (siempre visible) [cite: 237]
    renderHeader(app);

    // 3. Contenedor para el contenido variable
    const contentDiv = document.createElement('div');
    contentDiv.id = 'content';
    app.appendChild(contentDiv);

    // 4. Decidir qué mostrar según el Hash [cite: 240]
    const hash = location.hash;

    switch(hash) {
        case '#/cart':
            renderCart(contentDiv); // [cite: 242]
            break;
        case '#/stats':
            // renderStats(contentDiv); // Tu tarea: implementar stats
            contentDiv.innerHTML = '<h2>Estadísticas (En construcción)</h2>';
            break;
        case '#/products':
        default:
            // Si no hay hash, ir a productos por defecto [cite: 244]
            if (!hash) location.hash = '#/products'; 
            await renderProductsList(contentDiv); // [cite: 241]
            break;
    }
}

// Escuchar eventos de navegación [cite: 246-247]
window.addEventListener('hashchange', router);
window.addEventListener('load', router);