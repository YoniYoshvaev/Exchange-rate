const API_KEY = '4d330c9921090762ea0335c0/latest';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/ILS`;

document.getElementById('output').style.visibility = 'hidden';

async function getExchangeRates() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.conversion_rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return null;
    }
}

document.getElementById('ISRinput').addEventListener('input', async function (e) {
    let ISR = e.target.value;

    if (ISR === '') {
        document.getElementById('output').style.visibility = 'hidden';
        return;
    }

    const rates = await getExchangeRates();
    if (!rates) return;

    document.getElementById('output').style.visibility = 'visible';

    document.getElementById('EUROOutput').innerHTML = (ISR * rates.EUR).toFixed(2);
    document.getElementById('USAOutput').innerHTML = (ISR * rates.USD).toFixed(2);
    document.getElementById('GBPOutput').innerHTML = (ISR * rates.GBP).toFixed(2);
    document.getElementById('RUBOutput').innerHTML = (ISR * rates.RUB).toFixed(2);
});
