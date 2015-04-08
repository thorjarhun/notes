var a = "cat";
a = (function() {
      var old_a = a;
      return function() {
        return old_a;
      };
    })();

a = (function(a) {
      return function() {
        return a;
      };
    })(a);