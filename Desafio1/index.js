import express from 'express'

const app = express();

app.get('/',(req,res)=>{
    res.send('Hola mundo, desafio 1');
}); 


let puerto = process.env.PORT || 8080;
app.listen(puerto,()=>console.log(`Servidor corriendo en el puerto http://localhost:${puerto}`));