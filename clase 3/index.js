import express from 'express';



const app = express();

app.use(express.json());


let datos = [
    {id:1, nombre:'pepe', apellido:'perez', edad:20},
    {id:2, nombre:'maria', apellido:'perez', edad:30},
    {id:3, nombre:'juan', apellido:'perez', edad:40}
]


app.get('/',(req,res)=>{
    res.send('Hola mundo, desafio 1');
}); 

app.get('/datos',(req,res)=>{
    res.send(datos);
}); 

app.get('/datos/:id',(req,res)=>{
    const idFind = parseInt(req.params.id)
    const dato = datos.find(dato => dato.id === idFind)
    if (dato === undefined) {
        res.status(404).send({ mensaje: 'no existe el dato con el id' + idFind });
    }
    res.status(200).send(dato)
}); 

app.post('/datos', (req, res) => {

    const { nombre, apellido, edad } = req.body;

    const nuevoDato = { nombre, apellido, edad };

    if (!nombre || nombre.trim().length === 0) {
        return res.status(400).send({ mensaje: 'El nombre es requerido' });
    }

    if (!apellido || apellido.trim().length === 0) {
        return res.status(400).send({ mensaje: 'El apellido es requerido' });
    }

    const edadNum = parseInt(edad);
    if (isNaN(edadNum)) {
        return res.status(400).send({ mensaje: 'La edad debe ser un número' });
    }

    nuevoDato.id = datos.length + 1;
    nuevoDato.edad = edadNum; // guardamos edad como número
    datos.push(nuevoDato);

    res.send(nuevoDato);
});


app.delete('/datos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const existe = datos.some(item => item.id === id); 

    if (existe) {
        datos = datos.filter(item => item.id !== id); 
        res.send({ mensaje: 'Elemento eliminado',  existe});
    } else {
        res.status(404).send({ mensaje: 'Dato no encontrado' });
    }
});




let puerto = process.env.PORT || 8080;
app.listen(puerto,()=>console.log(`Servidor corriendo en el puerto http://localhost:${puerto}`));