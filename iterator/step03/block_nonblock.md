# Block & Non-Block

## Flow is blocking
* 프로그램이 실행되면 도중에 멈춰지지 않고 끝까지 실행되기 때문에 Flow는 Blocking이라고 볼 수 있다.
* 해당 함수(코드)가 Blocking 함수인지 아닌지 항상 감시하며 짜야 한다. 도중에 throw를 걸어주는 코드가 없이 끝까지 실행되는 함수가 있을 때, 잘못하면 브라우저나 OS가 Kill 시킬 수 있기 때문이다.

## Sync & Async
* Sync : 서브루틴이 즉시 값을 반환함
  <code>
  const double = v => v * 2;
  console.log(double(2)); // 4
  </code>

* Async : 서브루틴이 콜백을 통해 값을 반환함
  <code>
  const double = (v, f) => f(v * 2);
  double(2, console.log)
  </code>


