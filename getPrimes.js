const notDivisible = n => x => x % n > 0;

function* oddIter () {
  let n = 1;
  while (true) {
    n = n + 2;
    yield n;
  }
}

function filter (fn, iter) {
  return (function* () {
    let v;
    while (true) {
      v = iter.next().value;
      if (fn(v)) yield v;
    }
  })();
}

function* primes () {
  yield 2;
  let it = oddIter();
  while (true) {
    let n = it.next().value;
    yield n;
    it = filter(notDivisible(n), it);
  }
}

function getPrimes (num) {
  const result = [];
  for (let v of primes()) {
    if (v <= num) result.push(v);
    else break;
  }
  return result;
}
