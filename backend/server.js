const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const alumnosRoutes = require('./src/routes/alumnos');
app.use('/api/alumnos', alumnosRoutes);

// Conectar a la base de datos
connectDB();

