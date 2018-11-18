/**
 * Simple iterator
 */
function makeIterator(array) {
    var nextIndex = 0;
    
    return {
        next: function () {
            return nextIndex < array.length ?
            {value: array[nextIndex++], done: false} :
            {done: true}
        }
    }
}

var it = makeIterator(['yo', 'ya'])

console.log(it.next().value)
console.log(it.next().value)
console.log(it.next().done)


/**
 * Infinite iterator
 */
function idMaker() {
    var index = 0
    
    return {
        next: function () {
            return {value: index++, done: false}
        }
    }
}

var it = idMaker()

// console.log(it.next().value)
// console.log(it.next().value)
// console.log(it.next().value)


/**
 * With a generator
 * 1. function 키워드 끝에 *를 붙이면 generator가 된다. 
 * 2. yield는 next 함수 객체에 value와 done propetry를 자동 생성해준다.
 */
function* makeSimpleGenerator(array) {
    var nextIndex = 0
    
    while (nextIndex < array.length) {
        yield array[nextIndex++]
    }
}

var gen = makeSimpleGenerator(['yo', 'ya'])

console.log(gen.next().value); // 'yo'
console.log(gen.next().value); // 'ya'
console.log(gen.next().done);  // true

function* idMaker() {
    var index = 0
    while (true)
    yield index++
}

var gen = idMaker()

/*
console.log(gen.next().value); // '0'
console.log(gen.next().value); // '1'
console.log(gen.next().value); // '2'
*/