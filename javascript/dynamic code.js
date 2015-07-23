var a = "cat";

a = (function(a) {
      return function() {
        return a;
      };
    })(a);