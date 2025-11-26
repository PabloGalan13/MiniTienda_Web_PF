export function renderHeader(container) {
    // 1. Limpiar el contenedor (por si se vuelve a renderizar)
    container.innerHTML = "";

    // 2. Crear el header y el nav
    const header = document.createElement("header");
    const nav = document.createElement("nav");

    // 3. Crear los enlaces
    const links = [
        { text: "Productos", route: "#/products" },
        { text: "Carrito", route: "#/cart" },
        { text: "Estadísticas", route: "#/stats" }
    ];

    links.forEach(linkInfo => {
        const a = document.createElement("a");
        a.href = linkInfo.route;             
        a.textContent = linkInfo.text;

        a.classList.add("nav-link");

        nav.appendChild(a);
    });

    // 4. Insertar el nav en el header
    header.appendChild(nav);

    // 5. Insertar el header en el contenedor recibido
    container.appendChild(header);
}
