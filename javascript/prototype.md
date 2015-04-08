```javascript
var myObj = function() {
  this.value = "test";
};
myObj.prototype.print = function() {
  console.log(this.value);
};
var myObjInstance = new myObj();

//----------------------//

myObj == myObj.prototype.constructor          // true (1)
myObj == myObjInstance.__proto__.constructor  // true (2)
myObj.prototype == myObjInstance.__proto__    // true (3)

myObjInstance.__proto__ == myObj.prototype    // true (3)
myObjInstance.__proto__.constructor == myObj  // true (2)

myObjInstance.__proto__ == Object.getPrototypeOf(myObjInstance)
```

## Inheritance
  - *\__proto__\*: When an object 'rabbit' inherits from another object 'animal', that means there is a special property rabbit.*\__proto__\* = animal.
    - When a 'rabbit' property is accessed, and the interpreter can't find it in 'rabbit', it follows the *\__proto__\* link and searches in 'animal'.
    - For methods along the *\__proto__\* chain, *this* still refers to the object on which the method was invoked. In other words, the value of 'this' for function properties is set to the object, not its prototype.
    - The object referenced by *\__proto__\* is its prototype.
    - *\__proto__\* is referred to as [[Prototype]] in the specification.
  - constructor: An object has a built-in property named 'constructor', meant to reference the function which made the object.
    - When you declare a function, the interpreter creates the new function object with a 'prototype' property. By default, the 'prototype' property has a 'constructor' property set to the function itself.
  - 'new'
    - A 'new' function call returns an object with the *\__proto__\* set to the function's 'prototype'.
  - for..in loop
    - iterates through all properties of an object and its *\__proto__\* chain
    - Built-in properties and methods are not listed because they have a special [[Enumerable]] flag set to false.
  - instanceof operator
    - To resolve if obj instanceof F, check if any object on the *\__proto__\* chain from obj is equal to F.prototype.

```javascript
var Rabbit = function(name) {
  this.name = name;
};
// The interpreter sets Rabbit.prototype = { constructor: Rabbit, __proto__: Object.prototype }
// Also, Rabbit.__proto__ = Object.__proto__
var john = new Rabbit('John');
// The interpreter sets john.__proto__ = Rabbit.prototype
console.log(john.eats);       // undefined
Rabbit.prototype.eats = true;
console.log(john.eats);       // true
```

```javascript
// http://javascript.info/tutorial/pseudo-classical-pattern disagrees with the well-known way of inheriting like: Rabbit.prototype = new Animal()
//  but I disagree with its strategy. This example uses my own flavor.
var Animal = function(name) {
  this.name = name;
};
// Animal.prototype = { constructor: Animal, __proto__: Object.prototype };
// Animal.__proto__ = Object.__proto__
Animal.prototype.canWalk = true;
Animal.prototype.sit = function() {
  this.canWalk = false;
  alert(this.name + ' sits down.');
};
var Rabbit = function() {
  arguments.callee.prototype.__proto__.constructor.apply(this, arguments);
};
// Rabbit.prototype = { constructor: Rabbit, __proto__: Object.prototype };
// Rabbit.__proto__ = Object.__proto__
Rabbit.prototype.__proto__ = Animal.prototype;
Rabbit.prototype.jump = function() {
  this.canWalk = true;
  alert(this.name + ' jumps!');
};

var rabbit = new Rabbit('Sniffer');

rabbit.sit();
rabbit.jump();
```
