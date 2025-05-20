import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Conexión a MongoDB
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("🟢 Conectado a MongoDB"))
.catch((error) => console.error("🔴 Error de conexión:", error));

// Modelo
const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripcion: String
});

const Producto = mongoose.model("Producto", productoSchema);

// Ruta base
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});



app.get('/productos', async (req, res) => {
  try{
    const productos = await Producto.find();
    if(productos.length == 0 || productos === undefined){
      return res.status(404).send({ message: 'No existen productos' });
    }
    return res.status(200).json(productos);
  }
  catch(error){
    console.log(error);
    res.status(500).send({ message: 'Error al obtener los productos' });
  }
})

app.get('/productos/:id', async (req, res) => {
  try{
    const producto = await Producto.findById(req.params.id);
    if(producto == null || producto == undefined){
       return res.status(404).send({ message: 'No existe el producto' })
      }
    return res.status(200).json(producto);
  }
  catch(error){
    console.log(error);
    res.status(500).send({ message: 'Error al obtener el producto' });
  }
})

app.post('/agregar-productos', async (req, res) => {
  try{
    const {nombre, precio, descripcion} = req.body
    const producto = new Producto({nombre, precio, descripcion});
    await producto.save();
    return res.status(200).json(producto);
  }
  catch(error){
    console.log(error);
    res.status(500).send({ message: 'Error al agregar el producto' });
  }
})

app.delete('/productos/:id', async (req, res) => {
  try{
    const Eliminado = await Producto.findByIdAndDelete(req.params.id);
    if(Eliminado === null || Eliminado === undefined){
      return res.status(404).send({ message: 'No existe el producto' });
    }
    return res.status(200).json(Eliminado);
  }
  catch(error){
    console.log(error);
    res.status(500).send({ message: 'Error al eliminar el producto' });
  }
})

app.put('/productos/:id', async (req, res) => {
  try{
    const {id} = req.params;
    const {nombre, precio, descripcion} = req.body;
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).send({ message: 'Producto no encontrado' });
    }

    producto.nombre = nombre || producto.nombre;
    producto.precio = precio || producto.precio;
    producto.descripcion = descripcion || producto.descripcion;
    await producto.save();
    return res.status(200).json(producto);
  }
  catch(error){
    console.log(error);
    res.status(500).send({ message: 'Error al actualizar el producto' });
  }
})


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});