import { getNumberValue, toggleModal, setModalText } from './tools.js';
import { toggleDailyEarnings, toggleDiscountTAX, toggleRecurrentInvestment, calculateYield } from './methods.js';

document.getElementById('calculateButton').addEventListener('click', ClickedButton);
document.getElementById('okModalButton').addEventListener('click', ClickedButton);
document.getElementById('dailyEarnings').addEventListener('change', toggleSelector);
document.getElementById('willYouAddMore').addEventListener('change', toggleSelector);
document.getElementById('discountTAX').addEventListener('change', toggleSelector);

function ClickedButton(button) {
    let id = button.target.id;
    switch (id) {
        case 'calculateButton':
            let result = calculateYield();
            setModalText(result, 'modalResult');
            document.getElementById('result').classList.remove('hidden');
            document.getElementById('result').innerHTML = result;
            toggleModal('resultModal');
            break;
        case 'okModalButton':
            toggleModal('resultModal');
            break;
    }
}

function toggleSelector(selector) {
    let id = selector.target.id;
    let value = selector.target.checked;
    
    switch (id) {
        case 'dailyEarnings':
            toggleDailyEarnings(value);
            break;
        case 'willYouAddMore':
            toggleRecurrentInvestment(value);
            break;
        case 'discountTAX':
            toggleDiscountTAX(value);
            break;
    }
}

isNaN = function(value) {
    return typeof value !== "number" || Number.isNaN(value);
}