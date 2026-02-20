const express = require('express');
const sql = require('mssql/msnodesqlv8');

const app = express();
app.use(express.urlencoded({ extended: true }));

const config = {
    connectionString: "Driver={ODBC Driver 18 for SQL Server};Server=localhost\\SQLEXPRESS;Database=login_db;Trusted_Connection=Yes;TrustServerCertificate=Yes;"
};

// Conectar una sola vez
sql.connect(config)
    .then(() => console.log("Conectado a SQL Server"))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {

    const { usuario, password } = req.body;

    try {
        const result = await sql.query`
            SELECT * FROM usuarios 
            WHERE usuario = ${usuario} AND password = ${password}
        `;

        if (result.recordset.length > 0) {
            res.send("<h1>Autenticación correcta</h1>");
        } else {
            res.send("<h1>Usuario o password incorrecto</h1>");
        }

    } catch (err) {
        console.log(err);
        res.send("Error en el servidor");
    }
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});
