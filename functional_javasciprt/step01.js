
/**
 *  부수함수 : 평가시점마다 값이 바뀔 수 있는 함수가 부수함수이다.
 */

var c = 10;
function add2(a, b) {
    return a + b + c;
}

console.log(add2(10, 2));
console.log(add2(10, 3));
c = 20;
console.log(add2(10, 2));
console.log(add2(10, 3));

var c = 20;
function add3(a, b) {
    c = b;
    return a + b;
}

console.log(c);
console.log(add3(20, 30));
console.log(c);

var obj1 =  { val: 10};
function add4(obj, b) {
    obj.val += b;
}
console.log(obj1.val);
add4(obj1, 20);
console.log(obj1.val)

/**
 *  순수함수 : 언제 평가되어도 상관없는 함수가 순수함수다.
 */
function add(a, b) {
    return a + b;
}

// 모두 동일한 결과값
console.log(add(10, 50));
console.log(add(10, 50));
console.log(add(10, 50));
console.log(add(10, 50));
console.log(add(10, 50));

var obj1 = { val: 10};
function add5(obj, b) {
    return { val: obj.val + b}
}

console.log(obj1.val);
var obj2 = add5(obj1, 20);
console.log(obj1.val);
console.log(obj2.val);

/**
 * 일급 함수
 */
var f1 = function(a) { return a * a};
console.log(f1);

var f2 = add;
console.log(f2);

function f3(f) {
    return f();
}

console.log(f3(() => 10));

/**
 * add_maker
 */
 function add_maker(a) {
     return function(b) {
        return a + b;
     }
 }

 var add10 = add_maker(10);
 console.log(add10(20));

 var add5 = add_maker(5);
 var add15 = add_maker(15);

 console.log(add5(10));
 console.log(add15(20));

 
 function f4(f1, f2, f3) {
     return f3(f1() + f2());
 }

 console.log(f4(
     () => 2,
     () => 1,
     (a) => a * a
 ));
