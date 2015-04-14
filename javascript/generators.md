- Invoking a generator produces an iterator. The generator's iterator also has a Symbol.iterator function on it, which returns itself. Thus, a generator's iterator is also  an iterable!
- The for..of loop has a hidden behavior that sends a signal to the iterator for it to terminate when the loop terminates. You could instead manually terminate the
  generator's iterator instance from the outside with 'return (..)'.

Stopped @ https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&%20performance/ch4.md#es7-async-and-await
