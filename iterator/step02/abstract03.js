const odd = function*(data) {
  for (const v of data) {
    if (v % 2) yield v;
  }
}
 for (const v of odd([1, 2, 3, 4])) console.log(v);

const take = function*(data, n) {
  for (const v of data) {
    // console.log("take", take.cnt++);
    if (n--) yield v; else break;
  }
}
take.cnt = 0;
odd.cnt = 0;
for (const v of take([1, 2, 3, 4], 2)) console.log(v);


const Stream = class {
  static get(v) { return new Stream(v); }
  constructor(v) {
    this.v = v;
    this.filters = [];
  }
  add(gene, ...arg) {
    debugger;
    this.filters.push(v => {
      console.log('v: ' + v);
      return gene(v, ...arg);
    });
    return this;
  }
  *gene() {
    let v = this.v;
    for (const f of this.filters) v = f(v);
    yield* v;
  }
}

for (const v of Stream.get([1, 2, 3, 4]).add(odd).add(take, 2).gene())
console.log(v);
