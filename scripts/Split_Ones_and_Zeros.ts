function splitOnesZeros_0(array) {
    const zeros = [];
    const ones = [];
    array.forEach(el => el ? ones.push(el) : zeros.push(el));
    return {zeros, ones};
}

function splitOnesZeros_1(array) {
    const zeros = [];
    const ones = array.reduce((acc, curr, index) => {
        curr ? acc.push(curr) : zeros.push(curr);
        return acc;
    }, []);

    return {zeros, ones};
}

function splitOnesZeros_2(array) {
    const ones = array.filter(el => el);
    const zeros = (new Array(array.length - ones.length)).fill(0);
    return {zeros, ones};
}


function splitOnesZeros_3(array) {
    const zeros = [];
    const ones = array.filter(el => el ? el : !zeros.push(el));
    return {zeros, ones};
}