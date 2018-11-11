function fact(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

function factorization(n) {
    const sieve = findPrimes_sieve(n);
    const data = [];
    for (let i = 1; i <= n; i++) {
        if (sieve[i]) {
            data.push(i);
        } else {
            data.push(...factorize(i));
        }
    }
    return data;
}

function powerDistribution(factorized) {
    return factorized.reduce((acc, current) => {
        if (!acc[current]) {
            acc[current] = 1
        } else {
            acc[current] += 1
        }
        return acc;
    }, {});
}

function convolution(powerDistribution) {
    return Object.keys(powerDistribution).reduce((acc, factor) => {
        return acc * Math.pow(+factor, powerDistribution[factor]);
    }, 1);
}

function factorize(number) {
    let divisor = 2;
    const divisors = [];
    while (number > 1) {
        if (number % divisor === 0) {
            number /= divisor;
            divisors.push(divisor);
            divisor--;
        }
        divisor++;
    }
    return divisors;
}

function findPrimes_sieve(number) {
    const S = [];
    S[1] = 0;
    for (let k = 2; k <= number; k++)
        S[k] = 1;

    for (let k = 2; k * k <= number; k++) {
        if (S[k] === 1) {
            for (let l = k * k; l <= number; l += k) {
                S[l] = 0;
            }
        }
    }
    return S;
}

function startFlow(n) {
    return convolution(powerDistribution(factorization(n)));
}

function factorial_multiplication(n) {
    let result = '1';
    for (let i = 1; i <= n; i++) {
        result = string_multiplication(result, i);
    }
    return result;
}

function string_multiplication(a, b) {
    a = a.toString().split('').map(Number);
    b = b.toString().split('').map(Number);
    let result = [];
    let current;
    let overflow;
    let register = 0;
    for (let i = b.length - 1; i >= 0; i -= 1) {
        overflow = 0;
        for (let j = a.length - 1, k = 0; j >= 0; j -= 1, k += 1) {
            current = (result[register + k] || 0) + (b[i] * a[j]) + overflow;
            result[register + k] = current % 10;
            overflow = Math.floor(current / 10);
        }
        result = result.concat(overflow ? overflow.toString().split('').map(Number).reverse(): []);
        register += 1;
    }
    return result.reverse().join('');
}