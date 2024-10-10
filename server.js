const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Para resolver caminhos
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta atual
app.use(express.static(path.join(__dirname))); // Isso serve index.html na raiz

// Rota para a raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Envia index.html
});

// Rota para armazenar visitas
app.post('/api/visitas', (req, res) => {
    const { visitas } = req.body;
    console.log(`Total de visitas: ${visitas}`);
    res.status(200).send('Visitas registradas com sucesso!');
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
