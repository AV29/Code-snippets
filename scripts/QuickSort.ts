Array.prototype['quicksort'] = function () {
    if (!this.length) return [];
    const [head, ...tail] = this;
    return quicksort(tail.filter(el => el <= head))
        .concat(head)
        .concat(quicksort(tail.filter(el => el > head)));
};

const quicksort = function (arr) {
    if (!arr.length) return [];
    const [head, ...tail] = arr;
    return quicksort(tail.filter(el => el <= head))
        .concat(head)
        .concat(quicksort(tail.filter(el => el > head)));
};