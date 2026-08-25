// Commission calculation module
function calculateCommission(amount, rate) {
    return amount * rate;
}

function calculateProgressiveCommission(amount, rate) {
    if (amount < 100) {
        return amount * rate;
    }

    if (amount < 1000) {
        return (100 * rate) + ((amount - 100) * rate * 0.8);
    }

    return (100 * rate) +
           (900 * rate * 0.8) +
           ((amount - 1000) * rate * 0.5);
}

module.exports = {
    calculateCommission,
    calculateProgressiveCommission
};