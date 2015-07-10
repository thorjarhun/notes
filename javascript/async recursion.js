/*
  1. A function that uses a loop to decrement and display a counter until it reaches 0
*/
// Synchronous version
var func = function(n) {
  for (var i=n; i > 0; i--) {
    console.log(i);
  }
};
func(5);

// Synchronous version 2
var func = function(n) {
  while (n > 0) {
    console.log(n);
    n -= 1;
  }
};
func(5);

// Asynchronous version
var func = function(n) {
  if (n === 0) {
    return;
  }
  console.log(n);
  setTimeout(function() {
    func(n-1);
  }, 1000);
}
func(5);

// Asynchronous version 2
var func = function(n) {
  var f = function(n) {
    if (n === 0) {
      return;
    }
    console.log(n);
    return function() {
      return f(n-1);
    };
  };
  var a = f(n);
  var repeater = setInterval(function() {
    a = a();
    if (!a) {
      clearInterval(repeater);
    }
  }, 500);
};
func(5);

/*
  2. A function that uses tail recursion within a loop
*/
// Synchronous version
var func = function(n) {
  for (var i=0; i < n; i++) {
    console.log(n);
    func(n-1);
  }
};
func(3);

// first parts of execution stack
---------------------------------------------------------------------------------
func3 - log(3)      n = 3, i = 0  n > i   - callback1 = func(i=1, n=3)
  func2 - log(2)    n = 2, i = 0  n > i   - callback2 = func(i=1, n=2, callback1)
    func1 - log(1)  n = 1, i = 0  n > i   - callback3 = func(i=1, n=1, callback2)
      func0 -       n = 0, i = 0  n = i   - call callback3
    func1 -         n = 1, i = 1  n = i   - call callback2
  func2 - log(2)    n = 2, i = 1  n > i
    func1 - log(1)  n = 1, i = 0  n > i
      func0 -       n = 0, i = 0  n = i
    func1 -         n = 1, i = 1  n = i
  func2 -           n = 2, i = 2  n = i
func3 - log(3)      n = 3, i = 1
---------------------------------------------------------------------------------

// Synchronous version 2
var func = function(n) {
  var i = 0;
  while (i < n) {
    console.log(n);
    func(n-1);
    i++;
  };
};
func(3);

// Synchronous version 3
function func(n, i) {
  if (i === n) {
    return;
  } else {
    while (i < n) {
      console.log(n);
      func(n-1, 0);
      i += 1;
    }
  }
};
func(3, 0);

// Asynchronous version
function func(n, i, callback) {
  if (n === i) {
    //console.log(n + ' - calling callback');
    callback();
  } else if (i < n) {
    console.log(n); // + " - going deeper");
    var cb = function() {
      func(n, i + 1, callback);
    };
    setTimeout(function() {
      func(n - 1, 0, cb);
    }, 500);
  }
};
func(3, 0, function() {});

// Asynchronous version 2
function func(n, callback, i) {
  i = i || 0;
  if ((n === i) && callback) {
    callback();
  } else if (i < n) {
    console.log(n);
    var cb = function() {
      func(n, callback, i + 1);
    };
    setTimeout(function() {
      func(n - 1, cb);
    }, 500);
  }
};
func(3);

/*
  3. A function that uses recursion within a loop and has statements after the recursive call
*/
// Synchronous version
function func(n) {
  for (var i=0; i < n; i++) {
    console.log(n + " pre");
    func(n-1);
    console.log(n + " post");
  }
};
func(3);

// Synchronous version 2
var tabs = function(len) {
  return Array.prototype.join.call({length: (len || -1) + 1 }, '\t');
};
function func(n) {
  var maxN = n;
  var func2 = function(n) {
    for (var i=0; i < n; i++) {
      console.log(tabs(maxN - n) + n + " pre");
      func2(n-1);
      console.log(tabs(maxN - n) + n + " post");
    }
  };
  return func2(n);
};
func(3);

// Asynchronous version (does not work)
var tabs = function(len) {
  return Array.prototype.join.call({length: (len || -1) + 1 }, '\t');
};
function func(n, i, callback) {
  var maxN = n;
  var func2 = function (n, i, callback) {
    if (n === i) {
      callback();
    } else if (i < n) {
      console.log(tabs(maxN - n) + n + " pre");
      
      var cb2 = function() {
        console.log(tabs(maxN - n) + n + " post");
        setTimeout(function() {
          callback();
        }, 500);
      }
      var cb = function() {
        func2(n, i + 1, cb2);
      };
      setTimeout(function() {
        func2(n - 1, 0, cb);
      }, 500);
    }
  };
  return func2(n, i, callback);
};
func(3, 0, function() {});

/*
  4. A function that returns the next iteration of itself
*/
// Synchronous version
var func = function(n) {
  console.log(n);
  return function() {
    return func(n+1);
  };
};

var a = func(1); // 1
var b = a();    // 2
b = b();  // 3
b = b();  // 4
b();    // 5
a();    // 2

//  // Asynchronous version (the function works differently so that it won't go on indefinitely but the idea is the same)