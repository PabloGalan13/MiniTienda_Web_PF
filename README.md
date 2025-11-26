# MiniTienda Web -- Proyecto Final

Este proyecto es una aplicación web tipo **Mini Tienda**, desarrollada
como parte del curso de *Temas Emergentes de Web*.\
Utiliza una arquitectura sencilla de **Microfrontends** con **Vanilla
JS** en el frontend y una **API REST con Node.js, Express y MySQL (vía
Docker)** en el backend.

## Requisitos Previos

Para ejecutar este proyecto necesitas tener instalado:

1.  **Node.js** (Versión LTS recomendada)\
2.  **Docker Desktop** (Debe estar abierto y corriendo)
3.  **Visual Studio Code** (Recomendado)
    -   Extensión requerida: **Live Server**

## Guía de Instalación (Paso a Paso)

### 1. Instalar dependencias del Backend

``` bash
cd backend
npm install
```

### 2. Configurar Variables de Entorno (`.env`)

Crea un archivo `.env` dentro de la carpeta **backend/**:

    # Configuración del servidor
    PORT=3000

    # Configuración de Base de Datos (Docker)
    DB_HOST=localhost
    DB_USER=usuario_tienda
    DB_PASSWORD=1233
    DB_NAME=mini_tienda
    DB_DIALECT=mysql
    DB_PORT=3307

### 3. Levantar la Base de Datos

``` bash
docker-compose up -d
```

## Ejecutar el Proyecto

### 1. Iniciar el Backend

``` bash
npm run dev
```

### 2. Iniciar el Frontend

Abrir `index.html` con **Live Server**.

## Estructura del Proyecto

    /backend
    /frontend
    docker-compose.yml

## Solución de Problemas Comunes

### Error: Access denied for user

Verificar contraseña y puerto en `.env`.

### Error: Table doesn't exist

Ejecutar correctamente el backend para que `sequelize.sync()` cree las
tablas.
