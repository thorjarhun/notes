```js
var myObj = function() {};
var myObjInstance = new myObj();

console.assert(myObj === myObj.prototype.constructor);          // true (1)
console.assert(myObj === myObjInstance.__proto__.constructor);  // true (2)
console.assert(myObj.prototype === myObjInstance.__proto__);    // true (3)

console.assert(myObjInstance.__proto__ === myObj.prototype);    // true (3)
console.assert(myObjInstance.__proto__.constructor === myObj);  // true (2)

console.assert(myObjInstance.__proto__ === Object.getPrototypeOf(myObjInstance));
```

## Inheritance
##### *\__proto\__*
- When an object 'cat' inherits from another object 'animal', that means there is a special property cat.*\__proto\__* = animal.
- When a 'cat' property is accessed, and the interpreter can't find it in 'cat', it follows the *\__proto\__* link and searches in 'animal'.
- For methods along the *\__proto\__* chain, ___this___ still refers to the object on which the method was invoked. In other words, the value of 'this' for function properties is set to the object, not its prototype.
- The object referenced by *\__proto\__* is its prototype.
- *\__proto\__* is referred to as [[Prototype]] in the specification.

##### _constructor_ Property
- An object has a built-in property named 'constructor', meant to reference the function which made the object.
- When you declare a function, the interpreter creates the new function object with a 'prototype' property. By default, the 'prototype' property has a 'constructor' property set to the function itself.

##### _new_
- A ___new___ function call returns an object with the *\__proto\__* set to the function's 'prototype'.
- When ___new___ is called on a function, Javascript injects an implicit reference to the new object being created in the form of the ___this___ keyword and returns it, if the function doesn't explicitly return.
- When we do this:
```js
function Cat(name) {
  this.name = name;
}
var kitty = new Cat("Fluffy");
```
The engine is internally doing something like:
```js
function Cat(name) {
  var oThis = {};
  oThis.__proto__ = Cat.prototype;
  
  oThis.name = name;
  
  return oThis;
}
var kitty = Cat("Fluffy");
```

```js
var o = new Foo();

var o = {};
o.__proto__ = Foo.prototype;
Foo.call(o);
```

##### Internals Of The *new* Keyword
```javascript
// Pseudo-code for the 'new' operator
function NEW(f) {
  // Check if 'f.prototype' is an object, not a primitive (this should only happen if f.prototype was overwritten)
  var proto = Object(f.prototype) === f.prototype ? f.prototype : Object.prototype;

  // Create an object that inherits from 'proto'
  var obj = Object.create(proto);

  // Apply the function setting 'obj' as the 'this' value
  var ret = f.apply(obj, Array.prototype.slice.call(arguments, 1));

  // If the constructor returned an object, return it instead. Otherwise, return the constructed object.
  return (Object(ret) === ret) && ret || obj;
}
function NEW2(f) {
  var obj = Object.create(f.prototype);
  f.apply(obj, Array.prototype.slice.call(arguments, 1));
  return obj;
}
function NEW3(f) {
  var obj = {};
  obj.__proto__ = f.prototype;
  f.apply(obj, Array.prototype.slice.call(arguments, 1));
  return obj;
}
// Example usage:
function Foo (arg) {
  this.prop = arg;
}
Foo.prototype.inherited_prop = 'baz';

var a = NEW(Foo, 'bar');
var b = NEW2(Foo, 'bar');
var c = NEW3(Foo, 'bar');
console.dir(a);
console.dir(b);
console.dir(c);
```

##### Object.create
- Object.create(proto) returns an object: `{ __proto__: proto }`, for some *proto*.
```js
var a = {a: 1};
var b = Object.create(a);
b.b = 2;
var c = Object.create(b);
c.c = 3;
var d = Object.create(c);
d.d = 4;
for (var x in d) {
  console.log(x + ": " + d[x]);
}
```
##### [Prototypal Inheritance](http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/)
I don't think I like this inheritance strategy and I'm not sure if subclasses will have the proper *\__proto\__* chain.
```js
Object.create = function create(proto) {
  //It creates a temporary constructor F()
  function F() {}
  //And set the prototype of the this constructor to the parametric (passed-in) proto object
  //so that the F() constructor now inherits all the properties and methods of proto
  F.prototype = proto;
  //Then it returns a new, empty object (an instance of F())
  //Note that this instance of F inherits from the passed-in (parametric object) proto object.
  //Or you can say it copied all of the proto object's properties and methods
  return new F();
};
function inheritPrototype(childObject, parentObject) {
  // As discussed above, we use the Crockford’s method to copy the properties and methods from the parentObject onto the childObject
  // So the copyOfParent object now has everything the parentObject has
  var copyOfParent = Object.create(parentObject.prototype);

  // Then we set the constructor of this new object to point to the childObject, since it was overwritten by Object.create()
  copyOfParent.constructor = childObject;

  // Then we set the childObject prototype to copyOfParent, so that the childObject can in turn inherit everything from copyOfParent (from parentObject)
  childObject.prototype = copyOfParent;
}
```

##### for..in loop
- iterates through all properties of an object and its *\__proto\__* chain
- Built-in properties and methods are not listed because they have a special [[Enumerable]] flag set to false.

##### instanceof operator
- To resolve if obj instanceof F, check if any object on the *\__proto\__* chain from obj is equal to F.prototype.

##### Pseudo-Classical Inheritance
```js
// http://javascript.info/tutorial/pseudo-classical-pattern disagrees with the well-known way of inheriting like: Cat.prototype = new Animal()
//  but I disagree with its strategy. This example uses my own flavor.
function Animal(name) {
  this.name = name;
}
// Animal.prototype = { constructor: Animal, __proto__: Object.prototype };
// Animal.__proto__ = Object.__proto__
Animal.prototype.canWalk = true;
Animal.prototype.sit = function() {
  this.canWalk = false;
  alert(this.name + ' sits down.');
};
function Cat() {
  arguments.callee.prototype.__proto__.constructor.apply(this, arguments);
}
// Cat.prototype = { constructor: Cat, __proto__: Object.prototype };
// Cat.__proto__ = Object.__proto__
Cat.prototype.__proto__ = Animal.prototype;
Cat.prototype.jump = function() {
  this.canWalk = true;
  alert(this.name + ' jumps!');
};

var cat = new Cat('Sniffer');

cat.sit();
cat.jump();
```

##### Modifications To A Constructor's Prototype Are Reflected Even After Instantiation
```js
function Cat(name) {
  this.name = name;
}
// The interpreter sets Cat.prototype = { constructor: Cat, __proto__: Object.prototype }
// Also, Cat.__proto__ = Object.__proto__
var john = new Cat('John');
// The interpreter sets john.__proto__ = Cat.prototype
console.log(john.eats);       // undefined
Cat.prototype.eats = true;
console.log(john.eats);       // true
```

```js
var A = function A() {};
A.prototype.isA = true;

var B = function B() {};
B.prototype.isB = true;
console.assert(B.prototype.__proto__ === Object.prototype); // 'Object'
console.assert(B.__proto__ === Object.__proto__); // 'Empty'
/*
B.prototype.__proto__ = A;
B.prototype.__proto__ = A.prototype;
B.__proto__ = A;
B.__proto__ = A.prototype;
*/
var C = function C() {
  
};
```

```js
function A(a){
  this.varA1 = a;
}
A.prototype.varA2 = true;
A.prototype.doSomething = function doSomething() {
  // ...
};

function B(a, b){
  A.call(this, a);
  this.varB1 = b;
}
B.prototype = Object.create(A.prototype, {
  varB2: {
    value: true, 
    enumerable: true, 
    configurable: true, 
    writable: true 
  },
  doSomething: { 
    value: function doSomething() { // override
      A.prototype.doSomething.apply(this, arguments); // call super
      // ...
    },
    enumerable: true,
    configurable: true, 
    writable: true
  }
});
B.prototype.constructor = B;
var b = new B(1, 2);

var C = function C(a, c) {
  A.call(this, a);
  this.varC1 = c;
};
C.prototype.__proto__ = A.prototype;
C.prototype.varC2 = true;
C.prototype.doSomething = function doSomething() { // override
  A.prototype.doSomething.apply(this, arguments); // call super
  // ...
};
var c = new C(1, 2);

var D = function D(a, d) {
  A.call(this, a);
  this.varD1 = d;
};
D.prototype = Object.create(A.prototype);
D.prototype.constructor = D;
D.prototype.varD2 = true;
D.prototype.doSomething = function doSomething() { // override
  A.prototype.doSomething.apply(this, arguments); // call super
  // ...
};
var d = new D(1, 2);
```

```js
Cat.prototype = new Mammal();
Cat.prototype.constructor=Cat;
Cat.prototype.parent = Mammal.prototype;
```
