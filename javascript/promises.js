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