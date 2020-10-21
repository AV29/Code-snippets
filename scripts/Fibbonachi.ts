function getNthFib_Loop(n: number): number {
    let prev = 0;
    let next = 1;
    for (let i = 3; i < n; i ++) {
        let savedPrev = prev;
        prev = next;
        next = savedPrev + next;
    }

    return n === 1 || n === 2 ? n - 1 : prev + next;
}

function getNthFib_Recursion(n: number): number {
    if (n === 1 || n === 2) {
        return n - 1;
    } else {
        return getNthFib_Recursion(n - 1) + getNthFib_Recursion(n - 2);
    }
}

interface Memo {
    [key: number]: number
}

function getNthFib_Memo(n: number, cache: Memo = {1: 0, 2: 1}): number {
    if (cache[n] === undefined ) {
        cache[n] = getNthFib_Memo(n - 1, cache) + getNthFib_Memo(n - 2, cache);
    }
    return cache[n];
}

// 0 1 1 2 3 5 8 13