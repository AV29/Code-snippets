namespace SpiralWalkThrough {
    const exampleArray = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30]
    ];

    function getSpiralLoop(array) {
        let right, down, left, up;
        let depth = 0;
        let elementNumber = 0;

        const result = [];

        let isEnough = el => {
            result.push(el);
            elementNumber += 1;
            return elementNumber === array.length * array[0].length;
        };

        while (true) {

            right = depth;
            while (right < array[0].length - depth) {
                if (isEnough(array[depth][right])) return result;
                right += 1;
            }

            down = depth + 1;
            while (down < array.length - depth) {
                if (isEnough(array[down][array[0].length - depth - 1])) return result;
                down += 1;
            }

            depth += 1;

            left = array[0].length - depth;
            while (left > depth) {
                if (isEnough(array[array.length - depth][left - 1])) return result;
                left -= 1;
            }

            up = array.length - depth;
            while (up > depth - 1) {
                if (isEnough(array[up][depth - 1])) return result;
                up -= 1;
            }
        }
    }

    function getSpiralRecursion(array, result = []) {

        if (!array.length) return result;

        result = result.concat(array.shift());

        array.forEach(row => result.push(row.pop()));

        result = result.concat(array.pop().reverse());

        for (let i = array.length - 1; i >= 0; i--) result.push(array[i].shift());

        return getSpiralRecursion(array, result);
    }
}