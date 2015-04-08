// Sample 1
var o = { a:0 }

Object.defineProperty(o, "b", {
  get: function getB() {
    console.log("get b");
    return this.a + 1;
  },
  set: function setB(arg) {
    console.log("set b : ", arg);
    this.a = arg - 1;
    return arg;
  }
});

console.log(o.b) // Runs the getter, which yields a + 1 (which is 1)


// Sample 2
var log = ['test'];
var getter = function getter() {
  if (log.length == 0) return undefined;
  return log[log.length - 1];
};
// Using Object.defineProperty has a side-effect that the property can not be deleted
Object.defineProperty(window, 'obj', {get: getter});
// This has the same effect using __defineGetter__, but the property is still deletable
//window.__defineGetter__('obj', getter);
console.log(obj);
console.dir(obj);


// Sample 3
// Non-standard and deprecated way
var o = {};
o.__defineGetter__('gimmeFive', function() { return 5; });
console.log(o.gimmeFive); // 5

// Standard-compliant ways

// Using the get operator
var o = { get gimmeFive() { return 5; } };
console.log(o.gimmeFive); // 5

// Using Object.defineProperty
var o = {};
Object.defineProperty(o, 'gimmeFive', {
  get: function() {
    return 5;
  }
});
console.log(o.gimmeFive); // 5