class Queue<T> {
    private data: Array<T> = [];

    public enqueue(item: T): void {
        this.data.push(item);
    }

    public dequeue(): T {
        return this.data.shift();
    }
}

class Stack<T> {
    private data: Array<T> = [];

    private index = 0;

    public push(item: T): void {
        this.data[this.index++] = item;
    }

    public pop(): T {
        if(this.isEmpty()) {
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
