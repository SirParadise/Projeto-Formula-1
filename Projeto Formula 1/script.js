let balance = 100;
let intervalId;

function moveCars() {
    const cars = document.querySelectorAll('.car');
    const finishLinePosition = document.querySelector('.finish-line').getBoundingClientRect().left;

    cars.forEach(car => {
        const carPosition = car.getBoundingClientRect().left;
        if (carPosition >= finishLinePosition) {
            clearInterval(intervalId);
            announceWinner(car.id);
        } else {
            const move = Math.floor(Math.random() * 10) + 1;
            car.style.left = parseInt(car.style.left || 0) + move + 'px';
        }
    });
}



function placeBet() {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    const selectedDriver = parseInt(document.getElementById('driverSelect').value);
    if (isNaN(betAmount) || betAmount < 5 || betAmount > balance) {
        alert("Invalid bet amount!");
        return;
    }
    balance -= betAmount;
    document.getElementById('balance').innerText = balance;
    startRace();
}

function startRace() {
    document.querySelectorAll('.car').forEach(car => car.style.left = '0');
    intervalId = setInterval(moveCars, 50);
}

function announceWinner(winnerId) {
    const winnerNumber = parseInt(winnerId.substring(3));
    const selectedDriver = parseInt(document.getElementById('driverSelect').value);
    const betAmount = parseInt(document.getElementById('betAmount').value);
    let resultMessage;
    if (winnerNumber === selectedDriver) {
        balance += betAmount * 2;
        resultMessage = `Parabéns! Você ganhou R$ ${betAmount * 2}!`;
    } else {
        resultMessage = "Desculpe, você perdeu sua aposta.";
    }
    document.getElementById('balance').innerText = balance;
    document.getElementById('resultPanel').innerText = resultMessage;
}
