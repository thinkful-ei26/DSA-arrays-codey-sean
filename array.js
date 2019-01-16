const memory = require('./memory');

const myMemory = new memory();

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = myMemory.allocate(this.length);
    }

    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        myMemory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = myMemory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        myMemory.copy(this.ptr, oldPtr, this.length);
        myMemory.free(oldPtr);
        this._capacity = size;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return myMemory.get(this.ptr + index);
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = myMemory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
}

function main(){
    Array.SIZE_RATIO = 3;
    //create an instance of the array class
    let arr = new Array();
    //add an item to the array
    // arr.push(3);
    // arr.push(5);
    // arr.push(15);                // Q1 => length = 1, capacity = 3, address = 0
    // arr.push(19);
    // arr.push(45);
    // arr.push(10);                // Q2 => length = 6, capacity = 12, address = 3
    // arr.pop();
    // arr.pop();
    // arr.pop();                   // Q3 => length = 3, capacity = 12, address = 3 -> capacity is set when a push is made, it does not need to be reset when a pop happens.
    // console.log(arr.get(0))
    // arr.push("tauhida");
    // console.log(arr.get(0))      // Q4 => NaN -> is a nan because the index is expecting a number not a string.
                                    // Q5 => resize changes the capacity of the array.
    //console.log(arr);
}

main();