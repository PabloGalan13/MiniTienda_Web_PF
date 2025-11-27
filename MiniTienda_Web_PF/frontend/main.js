// frontend/main.js
import { renderHeader } from './components/header.js';
import { renderProductsList } from './components/productsList.js';
import { renderCart, renderStats } from './components/cartStats.js';
import { renderAddProduct } from './components/addProduct.js';

const app = document.getElementById('app');

async function router() {
    app.innerHTML = '';

    const headerDiv = document.createElement('div');
    renderHeader(headerDiv);
    app.appendChild(headerDiv);

    const contentDiv = document.createElement('div');
    contentDiv.id = 'content';
    app.appendChild(contentDiv);

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

        case '#/add-product':
            renderAddProduct(contentDiv);
            break;

        case '#/products':
        default:
            await renderProductsList(contentDiv);
            break;
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);