const users = [
    {
        name: 'Max',
        age: 16
    },
    {
        name: 'Hage',
        age: 23
    }
]

function _curryr(fn) {
    return function(a, b) {
        return arguments.length === 2 ? fn(a, b) : function(b) { return fn(b, a) }
    }
}

function _is_object(obj) {
    return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
    return _is_object(obj) ? Object.keys(obj) : [];
}

const _get = _curryr(function (obj, key) {
    return obj === null ? undefined : obj[key];
})

function _each(list, iter) {
    const keys = _keys(list);
    for (let i = 0; i < keys.length; i++) {
        iter(list[keys[i]]);
    }
    return list;
}

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

function _map(list, mapper) {
    let new_list = [];
    _each(list, val => {
        new_list.push(mapper(val))
    })
    return new_list;
}

function _filter(list, predi) {
    let new_list = [];
    _each(list, (val) => {
        if(predi(val)) {
            new_list.push(val);
        }
    })
    return new_list;
}


/**
 * 1. 수집하기
 */

console.log(
    _map(users, (user) => user.name)
)

function _values(data) {
   return _map(data, _identity)
}

function _identity(val) {
    return val;
}

const a = 10;
console.log(_identity(a));

console.log(users[0]);
console.log(_keys(users[0]));
console.log(_values(users[0]));


// pluck
function _pluck(data, key) {
    return _map(data, _get(key))
}

console.log(_pluck(users, 'age'));


/**
 *  2. 거르기 - filter
 */

console.log(
    _filter(users, user => user.age > 20)
)

function _negate(func) {
    return val => !func(val);
}

// reject
function _reject(data, predi) {
    return _filter(data, _negate(predi))
}

console.log(
    _reject(users, user => user.age > 20)
)

_filter = _curryr(_filter);
const _compact = _filter(_identity);

// compact
console.log(
    _compact([1, 2, 0, false, null, {}])
)


/**
 *  3. 찾아내기 - find
 */

function _find(list, predi) {
    const keys = _keys(list);
    for (let i = 0; i < keys.length; i++) {
        const val = list[keys[i]];
        if (predi(val)) return val;
    }
}

function _find_index(list, predi) {
    const keys = _keys(list);
    for (let i = 0; i < keys.length; i++) {
        if (predi(list[keys[i]])) return i;
    }
    return -1;
}

console.log(
    _find(users, user => user.age === 23)
)
console.log(
    _find_index(users, user => user.age === 23)
)
