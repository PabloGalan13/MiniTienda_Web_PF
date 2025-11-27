// frontend/components/addProduct.js

export function renderAddProduct(container) {
    container.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = "Registrar Nuevo Producto";
    container.appendChild(title);

    const form = document.createElement("form");
    form.classList.add("add-product-form");

    form.innerHTML = `
        <div class="form-group">
            <label for="name">Nombre del producto:</label>
            <input type="text" id="name" name="name" required placeholder="Ej. Laptop Gamer">
        </div>

        <div class="form-group">
            <label for="price">Precio ($):</label>
            <input type="number" id="price" name="price" step="0.01" required placeholder="0.00">
        </div>

        <div class="form-group">
            <label for="stock">Stock inicial:</label>
            <input type="number" id="stock" name="stock" required placeholder="10">
        </div>

        <div class="form-group">
            <label for="description">Descripción:</label>
            <textarea id="description" name="description" rows="3" placeholder="Detalles del producto..."></textarea>
        </div>

        <button type="submit" class="btn-primary">Guardar Producto</button>
        <button type="button" class="btn-secondary" id="cancelBtn">Cancelar</button>
    `;

    container.appendChild(form);

    // Evento Cancelar
    form.querySelector("#cancelBtn").addEventListener("click", () => {
        window.location.hash = "#/products";
    });

    // Evento Submit
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const newProduct = {
            name: form.name.value,
            price: parseFloat(form.price.value),
            stock: parseInt(form.stock.value),
            description: form.description.value
        };

        try {
            const response = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });

            if (!response.ok) {
                throw new Error("Error al guardar el producto");
            }

            alert("✅ Producto registrado exitosamente");
            window.location.hash = "#/products"; // Redirigir a la lista

        } catch (error) {
            console.error(error);
            alert("❌ Hubo un error al intentar registrar el producto.");
        }
    });
}