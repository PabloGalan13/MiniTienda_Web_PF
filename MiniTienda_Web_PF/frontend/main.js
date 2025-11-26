import { renderHeader } from './components/header.js';
import { renderProductsList } from './components/productsList.js';
import { renderCart, renderStats } from './components/cartStats.js';

const app = document.getElementById('app');

async function router() {
    app.innerHTML = '';

    // 1. Header siempre visible
    const headerDiv = document.createElement('div');
    renderHeader(headerDiv);
    app.appendChild(headerDiv);

    // 2. Contenedor dinámico
    const contentDiv = document.createElement('div');
    contentDiv.id = 'content';
    app.appendChild(contentDiv);

    // 3. Router basado en el hash
    const hash = location.hash;

    if (!hash) {
        location.hash = '#/products';
        return;
    }

    switch (hash) {
        case '#/cart':
            renderCart(contentDiv);
            break;

        case '#/stats':
            renderStats(contentDiv);
            break;

        case '#/products':
        default:
            await renderProductsList(contentDiv);
            break;
    }
}

// Eventos
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
