function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || '';
}

window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('nome').textContent = getQueryParam('nome');
    document.getElementById('email').textContent = getQueryParam('email');
    document.getElementById('assunto').textContent = getQueryParam('assunto');
    document.getElementById('mensagem').textContent = getQueryParam('mensagem');
});
