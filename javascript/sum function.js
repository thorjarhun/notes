// Simple version
var sum = function(x) {
  return function(y) {
    return x+y;
  };
};

// Advanced version (allows any number of invocations)
var sum = function(x) {
  var value = x;
  
  var f = function(y) {
    value += y;
    return f;
  };
  
  f.toString = function() {
    return value;
  };
  
  return f;
};