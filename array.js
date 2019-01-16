'use strict';
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

// URLify a string
// const urlify = string => {
//     let newString = '';
//     for(i = 0; i < string.length; i++) {
//         if(string[i] === ' ') {
//             newString += '%20';
//         } else newString += string[i]
//     }
//     return newString
// }
// console.log(urlify('some string'))

// Filtering an array
// const filter = arr => {
//     let newArr = [];
//     for(i = 0; i < arr.length; i++) {
//         if(arr[i] >= 5) {
//             newArr.push(arr[i])
//         }
//     }
//     return newArr;
// }
// console.log(filter([1,2,3,4,5,6,7]))

// Max sum in the array
// const maxSum = (arr) => {
//     let currentSum = 0;
//     let maxSum = 0;
//     for(i = 0; i < arr.length; i++) {

//         if(arr[i] + currentSum < 0) {
//             currentSum = 0;
//         }

//         else {
//             currentSum += arr[i];
//             if(currentSum > maxSum) {
//                 maxSum = currentSum;
//             }
//         }
//     }   
//     return maxSum;
// }
// console.log(maxSum([4,6,-13,5,-2,3]));

// Merge Arrays
// const merge = (arr1, arr2) => {
//     const mergedArr = [];
//     let currentIndex1 = 0;
//     let currentIndex2 = 0;

//     while(currentIndex1 !== arr1.length || currentIndex2 !== arr2.length) {
//         if(currentIndex2 === arr2.length || arr1[currentIndex1] <= arr2[currentIndex2]) {
//             mergedArr.push(arr1[currentIndex1]);
//             currentIndex1++;
//             // console.log('1', currentIndex1, arr1[currentIndex1-1]);
//         }
//         else {
//             mergedArr.push(arr2[currentIndex2]);
//             currentIndex2++;
//             // console.log('2', currentIndex2, arr2[currentIndex2-1]);
//         }
//     }

//   return mergedArr;
// };
// console.log(merge([1,3,6,8,11],[2,3,5,8,9,10]));

// Remove Characters
// const remove = (str, toBeRemoved) => {
//     let newStr = '';
//     for(let i = 0; i < str.length; i++) {
//         if(!toBeRemoved.includes(str[i])) {
//             newStr += str[i];
//         }
//     }
//     return newStr;
// }
// console.log(remove('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'))

// Products
// const product = arr => {
//     let newArr = [];
//     for(let i = 0; i < arr.length; i++) {
//         let product = 1;
//         for(let j = 0; j < arr.length; j++) {
//             if(j !== i) {
//                 product *= arr[j]
//             }
//         }
//         newArr.push(product)
//     } 
//     return newArr;  
// }
// console.log(product([1,3,9,4]))

// 2D array
const search = arr => {
    let clonedArr = JSON.parse(JSON.stringify(arr))
    for(let row = 0; row < arr.length; row++) {
        for(let collumn = 0; collumn < arr[row].length; collumn++) {
            if(arr[row][collumn] === 0) {
                clonedArr[row] = clonedArr[row].map( item => {
                   return 0;
            
                })
                clonedArr = clonedArr.map(row => {
                    row[collumn] = 0;
                    return row;
                });
            }
        }
    }
    return clonedArr;
}
console.log(search(
    [[1,0,1,1,0],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [1,0,1,1,1],
    [1,1,1,1,1]]
));