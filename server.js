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
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sugestão Recebida - DevBurger</title>
            <link href="/css/style.css" rel="stylesheet">
        </head>
        <body>
            <header>
                <h1 class="title">DevBurger</h1>
            </header>
            <main>
                <h2 class="section-title">Sugestão recebida!</h2>
                <div class="form">
                    <p>Obrigado por contribuir com o nosso cardápio!</p>
                    <p><strong>Nome do lanche:</strong> ${nome}</p>
                    <p><strong>Ingredientes:</strong> ${ingredientes}</p>
                    <div style="margin-top:2.5rem;text-align:center;">
                        <a href="/" class="btn">Voltar à página inicial</a>
                    </div>
                </div>
            </main>
            <footer>
                <p class="footer-text">&copy; 2025 DevBurger. Todos os direitos reservados.</p>
            </footer>
        </body>
        </html>
    `);
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

    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mensagem Recebida - DevBurger</title>
            <link href="/css/style.css" rel="stylesheet">
        </head>
        <body>
            <header>
                <div class="header-container">
                    <h1>DevBurger</h1>
                </div>
            </header>
            <main>
                <h2 class="section-title">Mensagem recebida!</h2>
                <div class="form">
                    <p>Obrigado por entrar em contato, <strong>${nome}</strong>!</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Assunto:</strong> ${assunto}</p>
                    <p><strong>Mensagem:</strong> ${mensagem}</p>
                    <div style="margin-top:2.5rem;text-align:center;">
                        <a href="/" class="btn">Voltar à página inicial</a>
                    </div>
                </div>
            </main>
            <footer>
                <p class="footer-text">&copy; 2025 DevBurger. Todos os direitos reservados.</p>
            </footer>
        </body>
        </html>
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