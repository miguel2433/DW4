# 📁 Proyecto Clase 4 – Conexión a MySQL

## 🗂️ Estructura de carpetas

Dentro de la carpeta `clase4`, creá la siguiente estructura:
```
clase4/
└── local-fyle-system/
    └── db.js
```
---

## 💾 Paso 1: Código para conectar a MySQL

Dentro del archivo `local-fyle-system/db.js`, copiá y pegá este código:

```js
import mysql from 'mysql2/promise';

async function connectDB() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'tuUsuario',       // ← Reemplazá esto
    database: 'DW4class4',
    password: 'tupassword',  // ← Reemplazá esto
    port: 3306
  });
  return connection;
}

export const connection = await connectDB();
```


## 💾 Paso 2: Crear la base de datos en MySQL

Abrí tu interfaz de MySQL (Workbench) y ejecutá el siguiente script SQL en un sql file:
```
DROP DATABASE IF EXISTS DW4Class4;
CREATE DATABASE IF NOT EXISTS DW4Class4;
```

## 💾 Paso 3: Instale los paquetes que utiliza este proyecto posicionandose en la ruta DW4/Clase4 y ejecutando este codigo en la terminal
```
    npm i
``` 


## 💾 Paso 4: Ejecutar el proyecto en la terminal asegurate de estar en la ruta correcta

```
node --watch index.js
```