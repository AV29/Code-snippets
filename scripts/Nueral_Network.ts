const rand = Math.random;
let setCount = 0;
const sigmoidActivation = x => 1 / (1 + Math.E ** (-x));

const mse = (ideal, actual, setCounts) => ((ideal - actual) ** 2) / setCounts;

function xor(i1, i2) {
    let o_in, o_out, h1_out, h2_out, error;
    const weights = {
        i1_w1: rand(),
        i1_w2: rand(),
        i2_w1: rand(),
        i2_w2: rand(),
        h1_w1: rand(),
        h2_w1: rand()
    };
    h1_out = sigmoidActivation(i1 * weights.i1_w1 + i2 * weights.i2_w1);
    h2_out = sigmoidActivation(i1 * weights.i1_w2 + i2 * weights.i2_w2);

    o_in = h1_out * weights.h1_w1 + h2_out * weights.h2_w1;
    o_out = sigmoidActivation(o_in);

    error = mse(1, o_out, setCount);

    console.log(o_out, error);
}

for (let i = 0; i < 10000; i++) {
    setCount++;
    xor(1, 0);
}
