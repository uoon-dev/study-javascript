var someString = 'hi';
typeof someString[Symbol.iterator];          // "function"

var iterator = someString[Symbol.iterator]();
iterator + '';                               // "[object String Iterator]"
 
iterator.next();                             // { value: "h", done: false }
iterator.next();                             // { value: "i", done: false }
iterator.next();                             // { value: undefined, done: true }

[...someString]                              // ["h", "i"]

var someString = new String('hi')

someString[Symbol.iterator] = function () {
    return {
        next: function () {
            if (this._first) {
                this._first = false
                return { value: 'bye', done: false }
            } else {
                return {
                    done: true
                }
            }
        },
        _first: true
    }
}

console.log([...someString])