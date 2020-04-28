const setLeadingZerosNumber = (value, digitsNumber = 2) =>
    [...new Array(digitsNumber - 1)]
        .reduce((acc, current, i) => value < Math.pow(10, i + 1) ? `0${acc}` : `${acc}`, value);


const seLeadingZerosString = (value, digitsNumber = 2) => {
    const repeatCount = digitsNumber - value.toString().length;
    return `${"0".repeat(repeatCount < 0 ? 0 : repeatCount)}${value}`;
};