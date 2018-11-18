// (data, f) => {
//   let v;
//   while (v = data.shift()) {
//     if (!(v instanceof Object)) f(v);
//     else {
//       if (!Array.isArray(v)) v = Object.values(v);
//       data.unshift(...v);
//     }
//   }
// }

const Operator = class {
  static factory(v) {
    if (v instanceof Object) {
      if (!Array.isArray(v)) v = Object.values(v);
      return new ArrayOp(v.map(v => Operator.factory(v)));
    } else return typeof v === 'string' ? new StringOp(v) : new PrimaOp(v);
  }
  constructor(v) { this.v = v; }
  *gene(){ throw 'override'; }
  // operation(f) { throw 'override'; }
};

const StringOp = class extends Operator {
  constructor(v) { super(v); }
  *gene(){ for (const v of this.v) yield * v.gene(); }
  // operation(f) { for (const v of this.v) {f(v);} }
}

const PrimaOp = class extends Operator {
  constructor(v) { super(v); }
  *gene(){ yield this.v; }
  // operation(f) { f(this.v); }
}

const ArrayOp = class extends Operator {
  constructor(v) { super(v); }
  *gene(){ for (const v of this.v) yield * v.gene(); }
}

for (const v of Operator.factory([1, 2, 3, { a: 4, b: 5}, 'test', 6, 7]).gene())
  console.log(v);
// Operator.factory([1, 2, 3, { a: 4, b: 5}, 'test', 6, 7]).operation(console.log);
