import { getNumberValue } from './tools.js';

export var dailyEarnings = false;
export var recurrentInvestment = false;
export var discountTAX = false;

export function calculateYield() {
    const initial = getNumberValue('initial');
    const rate = getNumberValue('rate');
    const years = getNumberValue('years');
    const months = getNumberValue('months');
    const days = getNumberValue('days');
    let result;

    if (isNaN(initial) || isNaN(rate) || isNaN(days) && isNaN(months) && isNaN(years)) {
        result = 'Please enter valid values.';
        return result;
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
        result = calculateDailyEarnings(initial, rate, time);
    }
    else {
        result = calculateYearlyEarnings(initial, rate, time);
    }
    return result;
}

export function calculateYearlyEarnings(initial, rate, time) {
    const earnings = initial * (rate / 100) * time;
    const total = initial + earnings;
    let result = `Yield Earnings: $${earnings.toFixed(2)}
    <br>Total final: $${total.toFixed(2)}`;
    if (discountTAX) {
        if (isNaN(getNumberValue('taxRate'))) {
            result = `Please enter a valid tax rate.`;
            return result;
        }
        const tax = earnings * (getNumberValue('taxRate') / 100);
        const finalTotal = total - tax;
        result += `<br>Tax: $${tax.toFixed(2)}
        <br>Total final after tax: $${finalTotal.toFixed(2)}`;
        return result;
    }
    return result;
}

export function calculateDailyEarnings(initial, rate, time) {
    const timeInDays = time * 365;
    const dailyRate = (rate / 100) / 365;
    let investment = getNumberValue('recurrentInvestmentQuantity');
    let investmentTime = 0;
    let earnings = 0;
    let total = initial;
    let earningsPerDay = [];
    let result;
    let totalTax = 0;
    if (recurrentInvestment) {
        if (isNaN(getNumberValue('investYears')) && isNaN(getNumberValue('investMonths')) && isNaN(getNumberValue('investDays'))) {
            result = `Please enter a valid investment time.`;
            return result;
        }
        if (!isNaN(getNumberValue('investYears'))) {
            investmentTime += getNumberValue('investYears') * 365;
        }
        if (!isNaN(getNumberValue('investMonths'))) {
            investmentTime += (getNumberValue('investMonths') * 31) - (parseInt(Math.floor(getNumberValue('investMonths') / 2)));
        }
        if (!isNaN(getNumberValue('investDays'))) {
            investmentTime += getNumberValue('investDays');
        }
    }
    let counter = 1;
    for (let i = 1; i <= timeInDays; i++) {
        let dayEarnings = total * dailyRate;
        if (counter === investmentTime) {
            total += investment;
            counter = 0;
        }
        if (discountTAX) {
            if (isNaN(getNumberValue('taxRate'))) {
                result = `Please enter a valid tax rate.`;
                return result;
            }
            let tax = dayEarnings * (getNumberValue('taxRate') / 100);
            totalTax += tax;
            dayEarnings -= tax;
        }
        earnings += dayEarnings;
        total += dayEarnings;
        earningsPerDay.push(dayEarnings);
        counter++;
    }
    const averageEarnings = earningsPerDay.reduce((acc, val) => acc + val, 0) / earningsPerDay.length;
    result = `Yield Earnings: $${earnings.toFixed(2)}
    <br>Total final: $${total.toFixed(2)}<br>
    Average earnings per day: $${averageEarnings.toFixed(2)}`;
    if (discountTAX) {
        result += `<br>Total tax: $${totalTax.toFixed(2)}`;
    }
    return result;
}

export function toggleDailyEarnings(value) {
    dailyEarnings = value;
    document.getElementById('recurrentInvestmentActivator').classList.toggle('hidden');
    document.getElementById('recurrentInvestmentGroup').classList.add('hidden');
    document.getElementById('willYouAddMore').checked = false;
}

export function toggleRecurrentInvestment(value) {
    recurrentInvestment = value;
    document.getElementById('recurrentInvestmentGroup').classList.toggle('hidden');
}

export function toggleDiscountTAX(value) {
    discountTAX = value;
    document.getElementById('discountTAXGroup').classList.toggle('hidden');
}