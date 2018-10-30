interface ICollection<T> {
    toString: () => string;
    isEmpty: () => boolean;
    size: number
}

class Queue<T> implements ICollection<T> {
    private _data: Array<T> = [];
    private _index = 0;

    get size() {return this._index;}

    public enqueue(item: T): void {
        this._data[this._index++] = item;
    }

    public dequeue(): T {
        if (this.isEmpty()) {
            return;
        }
        const item = this._data[0];
        for (let i = 0; i < this._index; i += 1) {
            this._data[i] = this._data[i + 1];
        }
        this._data.length -= 1;
        this._index -= 1;
        return item;
    }

    public isEmpty() {
        return !this._data.length;
    }

    public toString() {
        return this._data.toString();
    }
}

class Stack<T> implements ICollection<T> {
    private _data: Array<T> = [];
    private _index = 0;

    public get size() {return this._index;}

    public push(item: T): void {
        this._data[this._index++] = item;
    }

    public pop(): T {
        if (this.isEmpty()) {
            return;
        }
        const item = this._data[--this._index];
        this._data.length -= 1;
        return item;
    }

    public isEmpty() {
        return !this._data.length;
    }

    public toString() {
        return this._data.toString();
    }
}

const stack = new Stack<number>();
const queue = new Queue<string>();