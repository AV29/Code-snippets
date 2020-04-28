const setLeadingZeros = (value, digitsNumber = 2) =>
    [...new Array(digitsNumber - 1)]
        .reduce((acc, current, i) => value < Math.pow(10, i + 1) ? `0${acc}` : `${acc}`, value);