// components/cartStats.js

// ============================================
//   CARRITO
// ============================================
export function renderCart(container) {
    container.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = "Carrito";
    container.appendChild(title);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        container.innerHTML += "<p>El carrito está vacío.</p>";
        return;
    }

    const table = document.createElement("table");
    table.innerHTML = `
        <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acción</th>
        </tr>
    `;

    let grandTotal = 0;

    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        const subtotal = item.price * item.quantity;
        grandTotal += subtotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
            <td>$${subtotal}</td>
        `;

        // Botón eliminar
        const deleteCell = document.createElement("td");
        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Eliminar";

        btnDelete.addEventListener("click", () => {
            if (confirm("¿Seguro que quieres eliminar este producto?")) {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart(container);
            }
        });

        deleteCell.appendChild(btnDelete);
        row.appendChild(deleteCell);
        table.appendChild(row);
    });

    container.appendChild(table);

    const totalP = document.createElement("p");
    totalP.textContent = `Total: $${grandTotal}`;
    totalP.style.fontWeight = "bold";
    container.appendChild(totalP);

    // Botón limpiar carrito
    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Limpiar carrito";

    clearBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        alert("Carrito limpiado");
        renderCart(container);
    });

    container.appendChild(clearBtn);
}

// ============================================
//   ESTADÍSTICAS
// ============================================
export async function renderStats(container) {
    container.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = "Estadísticas";
    container.appendChild(title);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);
    const totalMoney = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

    const statsDiv = document.createElement("div");
    statsDiv.innerHTML = `
        <p><strong>Total de artículos en carrito:</strong> ${totalItems}</p>
        <p><strong>Valor total del carrito:</strong> $${totalMoney}</p>
    `;
    container.appendChild(statsDiv);

    try {
        const response = await fetch("http://localhost:3000/api/products");

        if (!response.ok) throw new Error("Error en la API");

        const products = await response.json();

        const apiDiv = document.createElement("div");
        apiDiv.innerHTML = `
            <p><strong>Total de productos en tienda:</strong> ${products.length}</p>
        `;
        container.appendChild(apiDiv);

    } catch (error) {
        const errorBox = document.createElement("div");
        errorBox.textContent = "⚠ No se pudieron cargar datos de la API.";
        errorBox.style.color = "red";
        container.appendChild(errorBox);
    }
}
