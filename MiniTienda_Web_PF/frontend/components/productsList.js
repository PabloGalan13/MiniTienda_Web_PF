export async function renderProductsList(container) {
    container.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = "Lista de productos";
    container.appendChild(title);

    const list = document.createElement("div");
    list.classList.add("products-container");
    container.appendChild(list);

    try {
        const response = await fetch("http://localhost:3000/api/products");

        if (!response.ok) {
            throw new Error("Error al recibir datos del servidor");
        }

        const products = await response.json();

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>Precio: $${product.price}</p>
            `;

            const button = document.createElement("button");
            button.textContent = "Agregar al carrito";

            button.addEventListener("click", () => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                const existing = cart.find(item => item.id === product.id);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1
                    });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Producto agregado");
            });

            card.appendChild(button);
            list.appendChild(card);
        });

    } catch (error) {
        const msg = document.createElement("div");
        msg.textContent = "❌ Ocurrió un error al cargar los productos. Intenta más tarde.";
        msg.style.color = "red";
        msg.style.marginTop = "20px";

        container.appendChild(msg);
    }
}
