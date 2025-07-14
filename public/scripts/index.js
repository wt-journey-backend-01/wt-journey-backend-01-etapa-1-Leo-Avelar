async function loadMenu() {
    try {
        const response = await fetch('/data/lanches.json');
        const menu = document.getElementById('cardapio');
        const menuOptions = await response.json();
        menu.innerHTML = '';
        
        menuOptions.forEach(option => {
            const col = document.createElement('div');
            col.className = 'col-12 col-sm-6 col-md-4 d-flex';
            col.innerHTML = `
                <div class="card text-bg-dark mb-3 flex-fill">
                    <div class="card-header text-center">
                        <span style="font-size:1.5rem;font-weight:bold;">${option.nome}</span>
                    </div>
                    <div class="card-body">
                        <span class="card-title mb-2 d-block" style="font-size:1rem;font-weight:700;">Ingredientes:</span>
                        <p class="card-text mb-0" style="margin-left:2px;">${option.ingredientes}</p>
                    </div>
                </div>
            `;
            menu.appendChild(col);
        });
        
    } catch (error) {
        document.getElementById('cardapio').innerHTML = '<p>Erro ao carregar o cardápio.</p>';
    }
}
document.addEventListener('DOMContentLoaded', loadMenu);