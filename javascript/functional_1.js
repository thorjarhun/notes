#Functional Programming Concepts

##Functor
__Definition:__

- An object or data structure you can map over.

##Monad
__Definition:__

- A structure that represents computations defined as sequences of steps.
- A construction that, given an underlying type system, embeds a corresponding type system into it. This monadic type system preserves all significant aspects of the underlying type system, while adding features particular to the monad.

A monad consists of a type constructor _M_ and two operations:

- __unit/return/point/of__
 - __`return :: t -> M t`__
 - takes a value from a plain type and puts it into a monadic constructor
- __bind__
 - __`(>>=) :: M t -> (t -> M u) -> M u`__
 - takes a monadic value and a function from a plain type to a monadic value, and returns a new monadic value
 - chains a monadic value of type __`M t`__ with a function of type __`t -> M u`__ to create a monadic value of type __`M u`__

It is also possible to substitute two other operations for __bind__:

- __fmap/lift__
 - __`fmap :: (t -> u) -> M t -> M u`__
 - takes a function between two types and produces a function that does the "same thing" to values in a monad
- __join__
 - __`join :: M (M t) -> M t`__
 - "flattens" two layers of monadic information into one




- __mjoin__
 - __`mjoin :: M M t -> M t`__
 - "flattens" two layers of monadic information into one
- __chain/bind__
 - __`chain :: (t -> M u) -> M t -> M u`__

///////////////

// Curry (naive implementation)
function curry(fn) {
  return function() {
    if (fn.length > arguments.length) {
      var slice = Array.prototype.slice;
      var args = slice.apply(arguments);
      return function() {
        return fn.apply(null, args.concat(slice.apply(arguments)));
      };
    }
    return fn.apply(null, arguments);
  };
}

var get = curry(function get(property, object) {
  return object[property];
});

var safeGet = curry(function(x,o) { return Maybe(o[x]); });

var add = curry(function(x, y) {
  return x + y;
});

var reverse = Function.prototype.call.bind(Array.prototype.reverse);
var reverseStr = function(obj) {
  return obj.split('').reverse().join('');
};
var first = function(array) { return array[0]; }

// Example
var split = curry(function(separator, string) {
  return String.prototype.split.call(string, separator);
});
var words = split(' ');

words("This string will be split");

// Example 2
var greater = function(x,y) {
  return x > y ? x : y;
};

var reduce = curry(function reduce(callback, initialValue, array) {
  return array.reduce(callback, initialValue);
});

var max = reduce(greater, -Infinity);

max([323,523,554,123,347]);
//=> 554

// Compose (naive implementation)
function compose(g, f) {
  return function(x) {
    return g(f(x));
  };
}

// Glue Code Example
on_error(function(error) {
  log(error.message);
});

on_error(compose(log, get('message')));

// Objects
var _Container = function(val) {
  this.val = val;
};

var Container = function(val) {
  return new _Container(val);
};

//Container(3);
//=> _Container {val: 3}

_Container.prototype.map = function(f) {
  return Container(f(this.val));
};

var map = curry(function(f, obj) {
  return obj.map(f);
});

// Maybe Functor
var _Maybe = function(val) {
  this.val = val;
};

var Maybe = function(val) {
  return new _Maybe(val);
};

_Maybe.prototype.map = function(f) {
  return this.val ? Maybe(f(this.val)) : Maybe(null);
};

// Either Functor
var _Right = function(val) {
  this.val = val;
};

var Right = function(val) {
  return new _Right(val);
};

_Right.prototype.map = function(f) {
  return Right(f(this.val));
};

var _Left = function(val) {
  this.val = val;
};

var Left = function(val) {
  return new _Left(val);
};

_Left.prototype.map = function(f) {
  return Left(this.val);
};

// IO
/*
var _IO = function(val) {
  this.val = val;
};

var IO = function(val) {
  return new _IO(val);
};
*/

// Monads
var chain = function(f) {
  return compose(mjoin, map(f));
};

//var mjoin = chain(id);