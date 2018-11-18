const iter1 = {
  [Symbol.iterator](){return this;},
  data: [1, 2, 3, 4],
  next() {
    return {
      done: this.data.length === 0,
      value: this.data.shift()
    }
  }
}

// console.log(iter1.next().value);
// console.log(iter1.next().value);

const data = [
  { a: [1, 2, 3, 4], b: '-'},
  [5, 6, 7],
  8, 9
];

const iter2 = {
  [Symbol.iterator](){return this;},
  data: data,
  next() {
    let v;
    while(v = this.data.shift()) {
      if (!(v instanceof Object)) return { value: v };
      if (!(Array.isArray(v))) v = Object.values(v);
      this.data.unshift(...v);
      // switch (true) {
      //   case Array.isArray(v):
      //     this.data.unshift(...v);
      //     break;
      //   case v && typeof v === 'object':
      //     for(let k in v) this.data.unshift(v[k]);
      //     break;
      //   default:
      //     return { value: v, done: false };
      // }
    }
    return { done: true };
  }
}

console.log(iter2.next().value);


const Complex = class {
  constructor(data) { this.data = data; }
  *gene() {
    const data = JSON.parse(JSON.stringify(this.data));
    let v;
    while (v = data.shift()) {
      if (!(v instanceof Object)) yield v;
      else {
        if (!(Array.isArray(v))) v = Object.values(v);
        data.unshift(...v);
      }
    }
  }
  // [Symbol.iterator]() {
  //   const data = JSON.parse(JSON.stringify(this.data));
  //   return {
  //     next() {
  //       let v;
  //       while (v = data.shift()) {
  //         if (!(v instanceof Object)) return { value: v };
  //         if (!(Array.isArray(v))) v = Object.values(v);
  //         data.unshift(...v); 
  //       }
  //       return { done: true };
  //     }
  //   }
  // }
}

const a = new Complex([{a: [1, 2, 3, 4], b: '-'}, [5, 6, 7], 8, 9]);
// console.log([...a]);
console.log([...a.gene()]);

