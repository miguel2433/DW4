import express from 'express'
import cors from 'cors'
import { connection } from "./local-fyle-system/db.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.get('/crear-tabla', async (req, res) => {
    const CreateTableQuery = `
        CREATE TABLE IF NOT EXISTS productos (
            Id INT AUTO_INCREMENT PRIMARY KEY,
            Nombre VARCHAR(255) NOT NULL,
            Precio DECIMAL(10, 2) NOT NULL,
            Descripcion TEXT
        )
    `;
    try {
        await connection.execute(CreateTableQuery);
        console.log('Tabla creada exitosamente');
        return res.status(200).send({ message: 'Tabla creada exitosamente' });
    } catch (error) {
        console.error('Error creando la tabla', error);
        return res.status(500).send({ message: 'Error al crear la tabla' });
    }
});

app.get('/productos', async (req, res) => {
    const GetProductsQuery = `SELECT * FROM productos`;
    try {
        const [results] = await connection.execute(GetProductsQuery);
        console.log('Productos obtenidos');
        return res.status(200).json(results);
    } catch (error) {
        console.error('Error consiguiendo los productos', error);
        return res.status(500).send({ message: 'Error al conseguir productos' });
    }
});

app.get('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const GetProductsQuery = `SELECT * FROM productos WHERE Id = ?`;
    try {
        const [result] = await connection.execute(GetProductsQuery, [id]);
        if(result.length === 0){
           return res.status(404).json({message:`El producto con el id: ${id} no existe`})
        }
        console.log('Producto por Id Conseguido');
        return res.status(200).json({ message: 'Producto por Id Conseguido', result });
    } catch (error) {
        console.error('Error consiguiendo producto por id', error);
        return res.status(500).send({ message: 'Error consiguiendo producto por id' });
    }
});

app.post('/agregar-productos', async (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    const insertQuery = `
        INSERT INTO productos (Nombre, Precio, Descripcion)
        VALUES (?, ?, ?)
    `;
    try {
        const [result] = await connection.execute(insertQuery, [nombre, precio, descripcion]);
        console.log('Producto insertado');
        return res.status(200).json({ message: 'Producto insertado correctamente', result });
    } catch (error) {
        console.error('Error insertando producto', error);
        return res.status(500).send({ message: 'Error al insertar el producto' });
    }
});

app.put('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;
    const updateQuery = `
        UPDATE productos
        SET Nombre = ?, Precio = ?, Descripcion = ?
        WHERE Id = ?
    `;
    try {
        const [result] = await connection.execute(updateQuery, [nombre, precio, descripcion, id]);
        console.log('Producto actualizado');
        return res.status(200).json({ message: 'Producto actualizado correctamente', result });
    } catch (error) {
        console.error('Error actualizando producto', error);
        return res.status(500).send({ message: 'Error al actualizar producto' });
    }
});

app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const deleteQuery = `DELETE FROM productos WHERE Id = ?`;
    try {
        const [result] = await connection.execute(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "El producto no existe" });
        }

        console.log('Producto eliminado');
        return res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error eliminando producto', error);
        return res.status(500).json({ message: 'Error al eliminar producto' });
    }
});

const puerto = process.env.PORT || 8080;
app.listen(puerto, () => console.log(`Servidor corriendo en http://localhost:${puerto}`));
