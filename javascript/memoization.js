var fib = function(n) {
  if (n <= 1) {
    return n;
  }
  return fib(n-1)+fib(n-2);
};

var memoize = function(func) {
  cache = {};
  return function() {
    var i = JSON.stringify(Array.prototype.slice.call(arguments));
    if (!(i in cache)) {
      cache[i] = func.apply(this, arguments);
    }
    return cache[i];
  };
};

fib = memoize(fib);

fib(33);
cache;