# API de Restobar Villa 29

Este es un proyecto de backend utilizando Express y Socket.io.

## Requisitos

- Node.js
- npm

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/david-rosval/inventario-y-cocina-backend.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd inventario-y-cocina-backend
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
    
## Ejecución en entorno local

### Agrega el archivo .env

Crea el archivo .env en el root del pro con la siguiente estructura:
```env
MODE="dev"
DB_HOST="[db_host]"
DB_MYSQL_PORT="[db_port]"
DB_USER="[db_user]"
DB_PASSWORD="[db_password]"
DB_DATABASE="[db_database]"
TOKEN_SECRET="[token_secret_hash]"
CLIENT_URL_DEV="http://localhost:[frontend-dev-port]"
```

### Uso

1. Inicia el servidor en modo desarrollo:
    ```bash
    npm run dev
    ```
    
## Tecnologías Utilizadas

- Express
- Socket.io
