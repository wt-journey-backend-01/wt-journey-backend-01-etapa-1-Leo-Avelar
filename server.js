const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;

    if (!nome || !ingredientes) {
        return res.status(400).send('<h1>Erro: Parâmetros inválidos!</h1>');
    }

    res.status(200).sendFile(path.join(__dirname, 'views', 'sugestao-recebida.html'));
});

app.get('/contato', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    if (!nome || !email || !assunto || !mensagem) {
        return res.redirect('/not-found');
    }
    
    const params = new URLSearchParams({ nome, email, assunto, mensagem }).toString();
    res.redirect(`/contato-recebido?${params}`);
});

app.get('/contato-recebido', (req, res) => {
    const { nome, email, assunto, mensagem } = req.query;

    if (!nome || !email || !assunto || !mensagem) {
        return res.redirect('/not-found');
    }

    res.status(200).sendFile(path.join(__dirname, 'views', 'contato-recebido.html'));
});

app.get('/api/lanches', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'data/lanches.json'));
});

app.get('/not-found', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});