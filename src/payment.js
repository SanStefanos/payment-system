const rates = require('../config/rates.json');

function processPayment(amount, currency) {
    const rate = rates[currency] ?? 0.02;
    const commissionAmount = amount * rate;
    const total = amount + commissionAmount;

    return {
        amount,
        commission: commissionAmount,
        total,
        currency
    };
}

module.exports = { processPayment };