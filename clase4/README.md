# 📁 Proyecto Clase 4 – Conexión a MySQL

## 🗂️ Estructura de carpetas

Dentro de la carpeta `clase4`, creá la siguiente estructura:


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

Abrí tu interfaz de MySQL (Workbench) y ejecutá el siguiente script SQL:
```
DROP DATABASE IF EXISTS DW4Class4;
CREATE DATABASE IF NOT EXISTS DW4Class4;
```

## 💾 Paso 3: Ejecutar el proyecto en la terminal asegurate de estar en la ruta correcta

```
node --watch index.js
```