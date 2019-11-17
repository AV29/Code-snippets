namespace SpiralWalkThrough {

    const exampleArray = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30]
    ];

    export function generateArray(x, y, range = 100) {
        const result = [];
        for (let i = 0; i < x; i++) {
            result.push([]);
            for (let j = 0; i < y; j++) {
                result[i].push(Math.random());
            }
        }

        return result;
    }

    export function getSpiralLoop(array) {
        let right, down, left, up;
        let depth = 0;
        let elementNumber = 0;

        const result = [];

        let isEnough = (x, y) => {
            result.push({x, y, element: array[x][y]});
            elementNumber += 1;
            return elementNumber === array.length * array[0].length;
        };

        while (true) {

            right = depth;
            while (right < array[0].length - depth) {
                if (isEnough(depth, right)) return result;
                right += 1;
            }

            down = depth + 1;
            while (down < array.length - depth) {
                if (isEnough(down, array[0].length - depth - 1)) return result;
                down += 1;
            }

            depth += 1;

            left = array[0].length - depth;
            while (left > depth) {
                if (isEnough(array.length - depth, left - 1)) return result;
                left -= 1;
            }

            up = array.length - depth;
            while (up > depth - 1) {
                if (isEnough(up, depth - 1)) return result;
                up -= 1;
            }
        }
    }

    export function getSpiralRecursive(array, result = []) {

        if (!array.length) return result;

        result = result.concat(array.shift());

        array.forEach(row => result.push(row.pop()));

        result = result.concat(array.pop().reverse());

        for (let i = array.length - 1; i >= 0; i--) result.push(array[i].shift());

        return getSpiralRecursive(array, result);
    }
}