Promises


// Example 1
function delay(ms) {
  var deferred = Q.defer();
  setTimeout(deferred.resolve, ms);
  return deferred.promise;
}

console.log(0);
delay(1000).then(function() {
  console.log(1);
  delay(1000).then(function() {
    console.log(2);
  });
});


// Example 2
Promise.resolve().then(function(data) {
  console.log(1);
  return new Promise(function(done) {
    setTimeout(done, 1000, 2);
  });
}).then(function(data) {
  console.log(data);
  return new Promise(function(done) {
    setTimeout(done, 1000, 3);
  });
}).then(function(data) {
  console.log(data);
});