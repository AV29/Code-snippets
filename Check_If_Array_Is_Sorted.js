function isSorted(arr, type) {
    if (type === void 0) { type = 'asc'; }
    for (var i = 0; i < arr.length - 1; i++) {
        if (type === 'asc') {
            return arr[i] <= arr[i + 1];
        }
        else if (type === 'desc') {
            return arr[i] >= arr[i + 1];
        }
    }
    return true;
}
console.log('[1,2,3,4], desc - ', isSorted([1, 2, 3, 4], 'desc'));
console.log('[1,2,3,4], asc - ', isSorted([1, 2, 3, 4], 'asc'));
console.log('[4,4,4], desc - ', isSorted([4, 4, 4], 'desc'));
console.log('[4,4,4], asc - ', isSorted([4, 4, 4], 'asc'));
console.log('[4,1,2,3], asc - ', isSorted([4, 1, 2, 3], 'asc'));
console.log('[4,3,2,1], desc - ', isSorted([4, 3, 2, 1], 'desc'));
