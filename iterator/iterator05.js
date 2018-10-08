/**
 * With ES2015 class
 */
class SimpleClass {
    constructor(data) {
        this.index = 0;
        this.data = data;
    }

    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.index < this.data.length) {
                    return {value: this.data[this.index++], done: false}
                } else {
                    this.index = 0
                    return {done: true}
                }
            }
        }
    }
}

const simple = new SimpleClass([1,2,3,4,5])

for (const val of simple) {
    console.log(val)
}