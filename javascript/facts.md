### Comma Operator
- lowest operator precedence
- evaluates both of its operands (from left to right) and returns the value of the second operand
- Ex. (1, 2, 3, 4) === 4
      (((1, 2), 3), 4) === 4
- that lets you specify more than one expression where JavaScript expects only one
- rarely essential but often useful and just occasionally downright elegant
- Good Quote: Semicolons partition statements. Comma operators partition expressions within statements.

### [Labeled Statements](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20&%20grammar/ch5.md#contextual-rules)

### Getters & Setters

### Variable Hoisting

### Constructs That Form Scopes
  - functions
  - Block Scopes
  - with
  - catch
  - let
  - const
  - eval (verify)
  - new Function (verify)

### Performance Busters
  - eval & with
  - they prevent the engine from performing compile-time optimizations regarding scope look-up, because the engine has to assume pessimistically that such optimizations may be invalid during runtime

### Operator precedence
  - '&&' > '||' > '? :'

### Object Names (as seen when using dev tools)

### Functions With Custom 'toString'/'valueOf'



# Cool Snippets:
##### Test Primality
```javascript
// Check if a number is prime
function isPrime(n) {
  var d = Math.ceil(Math.sqrt(n));
  while(n%(d--));
  return !d;
};
```

##### [Silly Coercion](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20&%20grammar/ch4.md#false-y-comparisons)
```javascript
[] == ![]       // true - WHAT?!?
2 == [2];       // true - WHAT?!?
"" == [null];   // true - WHAT?!?
0 == "\n"       // true - WHAT?!?

!!"0" == false; // false
"0" == false;   // true - WHAT?!?

NaN == NaN      // false
```

##### Async Timeout
```javascript
// Wrapping a callback with a timeout
function timeoutify(fn,delay) {
    var intv = setTimeout( function(){
            intv = null;
            fn( new Error( "Timeout!" ) );
        }, delay );

    return function() {
        // timeout hasn't happened yet?
        if (intv) {
            clearTimeout( intv );
            fn.apply( this, arguments );
        }
    };
}

function foo(err,data) {
  if (err) {
      console.error( err );
  } else {
      console.log( data );
  }
}

//ajax( "http://some.url.1", timeoutify( foo, 500 ) );
setTimeout( timeoutify( foo, 500 ), 450, null, "data"); // "data"
setTimeout( timeoutify( foo, 500 ), 550, null, "data"); // Error
```

##### Make A Function Asynchronous
```javascript
// Force a function to be async (https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&%20performance/ch2.md)
// Note: I mostly understand how this works.
function asyncify(fn) {
    var orig_fn = fn,
        intv = setTimeout( function(){
            intv = null;
            if (fn) fn();
        }, 0 );

    fn = null;

    return function() {
        // firing too quickly, before `intv` timer has fired to
        // indicate async turn has passed?
        if (intv) {
            fn = orig_fn.bind.apply(
                orig_fn,
                // add the wrapper's `this` to the `bind(..)`
                // call parameters, as well as currying any
                // passed in parameters
                [this].concat( [].slice.call( arguments ) )
            );
        }
        // already async
        else {
            // invoke original function
            orig_fn.apply( this, arguments );
        }
    };
}

function result(data) {
    console.log( "a: " + a );
}

var a = 0;

//ajax( "..pre-cached-url..", asyncify( result ) );
setTimeout( asyncify( result ), 0 );  // a: 1
asyncify( result )();                 // a: 1
a++;
```

##### Spread/Unwrap/Unpack/Destructure Arguments
```javascript
function spread(fn) {
  return Function.apply.bind( fn, null );
}
var func = function(x, y) {
  console.log(x, y);
};
var spread_func = spread(func);
spread_func([20, 30]);  // 20, 30
```
