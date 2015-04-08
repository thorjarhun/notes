// Peano numbers are a simple way of representing the natural numbers using only a zero value and a successor function.

// peano.js - Javascript Peano Arithmetic from thin air
// Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
//
// This is an illustration of how it is possible to construct the system of arithmetic
// on non-negative integers in Javascript without requiring any underlying arithmetic code by the host language.
// The system is based purely on the underlying logic of the language; that is, "if", "and", "or",
// "not" and the equals operator "==", as well as the logical constants true and false;
// those logical constants, incidentally, can be obtained by issuing "null == null" and "!( null == null)"
// respectively, so they are not required to be defined. Indeed, observe the following alternative:
//
// function getTrue() {
//     return null == null;
// }
//
// function getFalse() {
//     return !getTrue();
// }
//
// I have also refrained from using arrays, objects, for/do/while loops, variables, any build-in functions, and
// additional constants to illustrate how it is possible to construct this system using only a minimum set
// of language features.
//
// Furthermore, the "==" operator needs only be used with a right-hand-side of "null"; as such, it is in reality
// a unary operator determining if a value is null, nothing more.
//
// This program requires only one non-logical constant (that is a constant not part of the underlying formal logic) to be defined: null. This value is needed as the
// foundational basis for what we're going to build is oriented around that. We could indeed have used
// the constant "true" or the constant "false" instead of null, but this is not done to adhere to mathematics traditions where the
// mathematical theory is clearly distinguished from the underlying formal logic.
//
// Here is how you can define numeric constants if you need them. They are not necessary to perform arithmetic:
// var _0 = getZero();
// var _1 = increment( _0 );
// var _2 = increment( _1 );
// ...and so forth.
//
// It goes without saying that this implementation is horribly inefficient. Even performing the simplest arithmetic
// can take an enormous amount of time. Indeed, for example, it takes O( N + M ) to add numbers N and M (where N and M are the actual
// numbers, not their number of digits).

// getZero: A function that returns our representation for zero. That's nothing but our non-logical constant: null.
function getZero() {
    return null;
}

function isZero( a ) {
    return a == null;
}

// increment( a ): Returns a value that is 1 + the number we passed it. The way we represent numbers is through functions that
// return their predecessor.
function increment( a ) {
    return function() {
        return a;
    };
}

// decrement( a ): Returns a value that is the number we passed it - 1. This can be easily done by calling the argument passed,
// as numbers are encoded as functions returning their predecessor.
// Naturally, the argument cannot be zero. In that case, an error will occur.
function decrement( a ) {
    return a();
}

// add( a, b ): Adds two numbers recursively.
function add( a, b ) {
    if ( isZero( a ) ) {
        return b;
    }
    return add( decrement( a ), increment( b ) );
}

function equal( a, b ) {
    if ( isZero( a ) ) {
        return isZero( b );
    }
    if ( isZero( b ) ) {
        return false;
    }
    return equal( decrement( a ), decrement( b ) );
}

function lessThan( a, b ) {
    if ( isZero( a ) ) {
        return !isZero( b );
    }
    if ( isZero( b ) ) {
        return false;
    }
    return lessThan( decrement( a ), decrement( b ) );
}

function greaterThan( a, b ) {
    return !lessThan( a, b ) && !equal( a, b );
}

function subtract( a, b ) {
    // subtracts b from a i.e. performs the calculation a - b
    // this is for non-negative integers, so it will return zero
    // if b > a
    if ( isZero( b ) || isZero( a ) ) {
        return a;
    }
    return subtract( decrement( a ), decrement( b ) );
}

function multiply( a, b ) {
    if ( isZero( a ) ) {
        return getZero();
    }
    return add( multiply( decrement( a ), b ), b );
}

function divide( a, b ) {
    if ( isZero( a ) ) {
        return getZero();
    }
    return increment( divide( subtract( a, b ), b ) );
}


function value( a ) {
  if ( isZero( a ) ) {
    return 0;
  }
  return 1 + value( decrement( a ) );
}

var _0 = getZero();
var _1 = increment( _0 );
var _2 = increment( _1 );
var _3 = increment( _2 );
var _4 = increment( _3 );
var _5 = increment( _4 );

console.log( value( divide( multiply( _3, _5 ), _5 ) ) );