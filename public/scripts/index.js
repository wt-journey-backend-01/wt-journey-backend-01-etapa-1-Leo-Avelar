async function loadMenu() {
    try {
        const response = await fetch('/data/lanches.json');
        const menu = document.getElementById('cardapio');
        const menuOptions = await response.json();
        menu.innerHTML = '';
        
        menuOptions.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option-item';
            
            optionElement.innerHTML = `
                <h3>${option.nome}</h3>
                <p><strong>Ingredientes:</strong> ${option.ingredientes}</p>`;
            menu.appendChild(optionElement);
        });
        
    } catch (error) {
        document.getElementById('cardapio').innerHTML = '<p>Erro ao carregar o cardápio.</p>';
    }
}
document.addEventListener('DOMContentLoaded', loadMenu);