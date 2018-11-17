class BigNum {
    static digitize(number) {
        let res = [];
        let current = 0;
        while (number > 0) {
            current = number % 10;
            res.push(current);
            number = (number - current) / 10;
        }
        return res.reverse();
    }

    static mult(a, b) {
        a = BigNum.digitize(a);
        b = BigNum.digitize(b);
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
            result = result.concat(overflow ? BigNum.digitize(overflow).reverse() : []);
            register += 1;
        }
        return result.reverse().join('');
    }
}