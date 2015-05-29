##### Callback Hell - Pyramid of Doom
```js
setTimeout(function() {
  console.log("one");
  setTimeout(function() {
    console.log("two");
    setTimeout(function() {
      console.log("three");
    }, 1000);
  }, 1000);
}, 1000);
```

##### Same Flow with Promises
```js
var delay = function(t) {
  return new Promise(function(resolve) {
    setTimeout(resolve, t);
  });
};
Promise.resolve(delay(1000))
.then(function() {
  console.log("one");
  return delay(1000);
}).then(function() {
  console.log("two");
  return delay(1000);
}).then(function() {
  console.log("three");
});
```