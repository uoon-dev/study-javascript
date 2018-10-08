/**
 *  map, filter, each
 */
function _filter(list, predi) {
    let new_list = [];
    _each(list, (val) => {
        if(predi(val)) {
            new_list.push(val);
        }
    })
    // for (let i = 0; i < list.length; i++) {
    //     if(predi(list[i])) {
    //         new_list.push(list[i]);
    //     }
    // }
    return new_list;
}

let over_25 = _filter([12, 25, 31, 22, 27, 40], (num) => num > 25);

function _map(list, mapper) {
    let new_list = [];
    _each(list, (val) => {
        new_list.push(mapper(val));
    })
    // for (let i = 0; i < list.length; i++) {
    //     new_list.push(mapper(list[i]))
    // }
    return new_list;
}

function _is_object(obj) {
    return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
    return _is_object(obj) ? Object.keys(obj) : [];
}

function _each(list, iter) {
    const keys = _keys(list);
    for (let i = 0; i < keys.length; i++) {
        iter(list[keys[i]]);
    }
    return list;
}


console.log(_map(over_25, item => item * 2));


/**
 * curry
 */
function _curry(fn) {
    return function(a, b) {
        return arguments.length === 2 ? fn(a, b) : function(b) { return fn(a, b) }
    }
}

function _curryr(fn) {
    return function(a, b) {
        return arguments.length === 2 ? fn(a, b) : function(b) { return fn(b, a) }
    }
}

const add = _curry(function(a, b) {
    return a + b;
})

let add10 = add(10);
console.log(add10(5));
console.log(add(10)(5));
console.log(add(10, 5));


const sub = _curryr(function(a, b) {
    return a - b;
})

let sub10 = sub(10);
console.log(sub10(5));


/**
 * _get 만들어 좀 더 간단하게 하기
 */
const _get = _curryr(function (obj, key) {
    return obj === null ? undefined : obj[key];
})
const _length = _get('length')
// let user1 = users[0];
// console.log(user1);
// console.log(user1.name);
// console.log(_get(users1, 'name'));
// console.log(_get('name')(users1));

console.clear();


/**
 * _reduce 만들기
 */
const slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
    if (arguments.length === 2) {
        memo = list[0];
        // 이 경우 list가 배열이어야만 가능하다는 문제점이 있다.
        // -> const slice = Array.prototype.slice;
        // -> slice.call(list, 1); 이렇게 하면 list가 배열이 아니어도 배열을 리턴해주게 된다.
        list = _rest(list);
    }
    _each(list, function(val) {
        memo = iter(memo, val);
    })
    return memo;
// iter(iter(iter(0, 1), 2), 3);
}

console.log(_reduce([1, 2, 3, 4], add, 0));
console.log(_reduce([1, 2, 3], add));
 // 6

// momo = add(0, 1);
// memo = add(memo, 2);
// memo = add(memo, 3);
// return memo;

console.clear();


/**
 * 파이프라인 만들기
 */
function _pipe() {
    const fns = arguments;
    return function(arg) {
        return _reduce(fns, function(arg, fn) {
            return fn(arg);
        }, arg)
    }
}
// function _pipe() {
//     const fns = arugments;
//     return (arg) => _reduce(fns, (arg, fn) => fn(arg), arg)
// }

function _go(arg) {
    const fns = _rest(arguments);
    _pipe.apply(null, fns)(arg);
}

const f1 = _pipe(
    function(a) { return a + 1; }, // 1 + 1 
    function(a) { return a * 2; },
    function(a) { return a * a; },
 ) // 2 * 2

console.log(f1(1));

/**
 * go
 */
_go(1,
    function(a) { return a + 1; }, // 1 + 1 
    function(a) { return a * 2; },
    function(a) { return a * a; },
    console.log) // 2 * 2

    
console.log(
    _map([1, 2, 3], function(val) { return val * 2 })
)
    
var _map = _curryr(_map),
    _filter = _curryr(_filter);

console.log(
    _map(function(val) { return val * 2 })([1, 2, 3])
)

// _go([],
//     filter(user => user.age >= 30),
//     _map(_get('')),
//     console.log
// )


/**
 * keys 에러처리
 */
console.log(_keys(null));


/**
 *  _each 외부 다형성 높이기
 */
_each({
    13: 'ID',
    19: 'HD',
    23: 'YD'
}, name => console.log(name));

_go({
    13: 'ID',
    19: 'HD',
    23: 'YD'
}, _map(name => name.toLowerCase()),
console.log);