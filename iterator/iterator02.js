var myIterable = {}
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
}

console.log([...myIterable])

var myObj = {}
console.log(new Map([[1, 'a'], [2, 'b'], [3, 'c']]).get(2))
