var dailyEarnings = false;

function calculateYield() {
    const initial = parseFloat(document.getElementById('initial').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const years = parseFloat(document.getElementById('years').value);
    const months = parseFloat(document.getElementById('months').value);
    const days = parseFloat(document.getElementById('days').value);

    if (isNaN(initial) || isNaN(rate) || isNaN(days) && isNaN(months) && isNaN(years)) {
        document.getElementById('result').innerText = 'Please enter valid values.';
        return;
    }

    let time = 0;
    if (!isNaN(years)) {
        time += years;
    }
    if (!isNaN(months)) {
        time += months / 12;
    }
    if (!isNaN(days)) {
        time += days / 365;
    }

    if (dailyEarnings) {
        calculateDailyEarnings(initial, rate, time);
    }
    else {
        calculateYearlyEarnings(initial, rate, time);
    }
}

function openModal() {
    document.getElementById('modalResult').innerHTML = document.getElementById('result').innerHTML;
    document.getElementById('resultModal').classList.add('show');
}

function closeModal() {
    document.getElementById('resultModal').classList.remove('show');
}

function toggleDailyEarnings(event) {
    dailyEarnings = event.target.checked;
}

function ClickedButton() {
    document.getElementById('result').classList.remove('hidden');
    calculateYield();
    openModal();
}

function calculateYearlyEarnings(initial, rate, time) {
    const yield = initial * (rate / 100) * time;
    const total = initial + yield;
    document.getElementById('result').innerHTML = `Yield Earnings: $${yield.toFixed(2)}
    <br>Total final: $${total.toFixed(2)}`;
}

function calculateDailyEarnings(initial, rate, time) {
    const timeInDays = time * 365;
    const dailyRate = (rate / 100) / 365;
    let yield = 0;
    let total = initial;
    let earningsPerDay = [];
    for (let i = 0; i < timeInDays; i++) {
        yield += total * dailyRate;
        total += total * dailyRate;
        earningsPerDay.push(total * dailyRate);
    }
    const averageEarnings = earningsPerDay.reduce((acc, val) => acc + val, 0) / earningsPerDay.length;
    console.log(earningsPerDay);
    console.log(averageEarnings);
    document.getElementById('result').innerHTML = `Yield Earnings: $${yield.toFixed(2)}
    <br>Total final: $${total.toFixed(2)}<br>
    Average earnings per day: $${averageEarnings.toFixed(2)}`;
}