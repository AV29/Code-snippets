interface ICollection<T> {
    toString: () => string;
    isEmpty: () => boolean;
}

class Queue<T> implements ICollection<T> {
    private data: Array<T> = [];

    private index = 0;

    public enqueue(item: T): void {
        this.data[this.index++] = item;
    }

    public dequeue(): T {
        if (this.isEmpty()) {
            return;
        }
        const item = this.data[0];
        for (let i = 0; i < this.index; i += 1) {
            this.data[i] = this.data[i + 1];
        }
        this.data.length -= 1;
        this.index -= 1;
        return item;
    }

    public isEmpty() {
        return !this.data.length;
    }

    public toString() {
        return this.data.toString();
    }
}

class Stack<T> implements ICollection<T> {
    private data: Array<T> = [];

    private index = 0;

    public push(item: T): void {
        this.data[this.index++] = item;
    }

    public pop(): T {
        if (this.isEmpty()) {
            return;
        }
        const item = this.data[--this.index];
        this.data.length -= 1;
        return item;
    }

    public isEmpty() {
        return !this.data.length;
    }

    public toString() {
        return this.data.toString();
    }
}

const stack = new Stack<number>();
const queue = new Queue<string>();