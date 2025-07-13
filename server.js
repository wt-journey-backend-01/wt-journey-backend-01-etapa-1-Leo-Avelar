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

    res.status(200).send(`
        <h1>A DevBurger agradece sua sugestão!</h1>
        <h2>Vamos analisar seu pedido!</h2>
        </br>
        <p><strong>Nome: </strong>${nome}</p>
        <p><strong>Ingredientes: </strong>${ingredientes}</p>
        </br>
        <p>Obrigado por contribuir com o nosso cardápio!</p>
        <a href="/">Voltar para a página inicial</a>
        `);
});

app.get('/contato', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'contato.html'));
});

let lastContact = null;

app.post('/contato', (req, res) => {
    lastContact = req.body;
    res.redirect('/contato-recebido');
});

app.get('/contato-recebido', (req, res) => {
    if (!lastContact) {
        return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }

    const { nome, email, assunto, mensagem } = lastContact;

    res.status(200).send(`
        <h1>Agradecemos sua mensagem, ${nome}!</h1>
        <p>E-mail: ${email}</p>
        <p>Assunto: ${assunto}</p>
        <p>Mensagem: ${mensagem}</p>
        <a href="/">Voltar para a página inicial</a>
    `);
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