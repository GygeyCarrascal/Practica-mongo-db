
const express = require('express');
const cors = require('cors');
require('dotenv').config();


const { dbconection } = require('./App/config/config'); 
const app = express();

app.use(cors());

app.use(express.json());

dbconection();

app.use('/api/login', require('./App/routes/authRoute'));
app.use('/api/oficina', require('./App/routes/oficinasRoutes'));
app.use('/api/reserva', require('./App/routes/reservaRoute'));
app.use('/api/vehic', require('./App/routes/vehiculosRoute'));
app.use('/api/empl', require('./App/routes/empleadosRoute'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})