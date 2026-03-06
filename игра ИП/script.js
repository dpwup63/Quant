 let money = 200;
    let qubits = 0;
    let temp = 300.0;
    let stability = 100.0;
    let active = true;

    function update() {
        document.getElementById('money').innerText = money + "$";
        document.getElementById('qubits').innerText = qubits + " / 50";
        document.getElementById('temp').innerText = temp.toFixed(2);
        document.getElementById('stab-text').innerText = Math.floor(stability) + "%";
        
        const fill = document.getElementById('stab-fill');
        fill.style.width = stability + "%";
        
        // Цвет шкалы
        if(stability < 30) fill.style.background = 'var(--red)';
        else if(stability < 60) fill.style.background = 'var(--gold)';
        else fill.style.background = 'var(--green)';

        // Кнопки
        document.getElementById('btn-q').disabled = money < 200;
        document.getElementById('btn-c').disabled = money < 150;
        
        // Условие появления кнопки "Запуск"
        if(qubits >= 50 && temp < 0.1) {
            document.getElementById('btn-win').style.display = 'flex';
        }
    }

    function addMoney() { if(!active) return; money += 50; update(); }
    
    function buyQubits() {
        if(money >= 200) {
            money -= 200; qubits += 10; stability -= 15;
            update();
        }
    }

    function coolDown() {
        if(money >= 150) {
            money -= 150; temp /= 10; stability = Math.min(100, stability + 10);
            update();
        }
    }

    function winGame() {
        active = false;
        document.getElementById('win-overlay').style.display = 'flex';
    }

    // Игровой цикл
    setInterval(() => {
        if(!active) return;
        
        // Стабильность падает от кубитов
        stability -= (0.2 + (qubits * 0.05));
        
        // Температура потихоньку растет
        temp += 0.01;

        if(stability <= 0) {
            active = false;
            document.getElementById('fail-overlay').style.display = 'flex';
        }
        update();
    }, 100);

    update();