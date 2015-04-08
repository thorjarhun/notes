// Source: Tero Parviainen - http://teropa.info/blog/2013/11/03/make-your-own-angular-part-1-scopes-and-digest.html

/* Dependencies:
  <script src="http://cdnjs.cloudflare.com/ajax/libs/lodash.js/1.2.1/lodash.min.js"></script>
*/
function Scope() {
  this.$$watchers = [];
  this.$$asyncQueue = [];
  this.$$postDigestQueue = [];
  this.$$phase = null;
}

Scope.prototype.$watch = function $watch(watchFn, listenerFn, valueEq) {
  var self = this;
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn || function() {},
    valueEq: !!valueEq
  };
  this.$$watchers.push(watcher);
  return function() {
    var index = self.$$watchers.indexOf(watcher);
    if (index >= 0) {
      self.$$watchers.splice(index, 1);
    }
  };
};

// Maybe make this: var $$digestOnce, since Angular scopes don't actually have this function (it's nested inside $digest instead)
Scope.prototype.$$digestOnce = function $$digestOnce() {
  var self = this;
  var dirty;
  this.$$watchers.forEach(function(watcher) {
    try {
      var newValue = watcher.watchFn(self); // the watch function is called with the current scope as an argument
      var oldValue = watcher.last;
      if (!self.$$areEqual(newValue, oldValue, watcher.valueEq)) {
        watcher.listenerFn(newValue, oldValue, self);
        dirty = true;
        // If using value based equality comparison, store a deep copy. Otherwise, store the reference.
        watcher.last = (watcher.valueEq ? _.cloneDeep(newValue) : newValue);
      }
    } catch (e) {
      (console.error || console.log)(e);
    }
  });
  return dirty;
};

Scope.prototype.$digest = function $digest() {
  var ttl = 10; // TTL stands for Time To Live. This is the maximum number of iterations before giving up (like a timeout).
  var dirty;
  this.$beginPhase("$digest");
  do {
    while (this.$$asyncQueue.length) {
      try {
        var asyncTask = this.$$asyncQueue.shift();
        this.$eval(asyncTask.expression);
      } catch (e) {
        (console.error || console.log)(e);
      }
    }
    dirty = this.$$digestOnce();
    if (dirty && !(--ttl)) {
      this.$clearPhase();
      throw "10 digest iterations reached";
    }
  } while (dirty);
  this.$clearPhase();

  while (this.$$postDigestQueue.length) {
    try {
      this.$$postDigestQueue.shift()();
    } catch (e) {
      (console.error || console.log)(e);
    }
  }
};

// Maybe make this: var $$areEqual
Scope.prototype.$$areEqual = function $$areEqual(newValue, oldValue, valueEq) {
  if (valueEq) {
    return _.isEqual(newValue, oldValue);
  } else {
    return newValue === oldValue ||
           (typeof newValue === 'number' &&
            typeof oldValue === 'number' &&
            isNaN(newValue) && isNaN(oldValue));
  }
};

Scope.prototype.$eval = function $eval(expr, locals) {
  return expr(this, locals);
};

Scope.prototype.$apply = function $apply(expr) {
  try {
    this.$beginPhase("$apply");
    return this.$eval(expr);
  } finally {
    this.$clearPhase();
    this.$digest();
  }
};

// Takes a function and schedules it to run later but still during the ongoing digest or before the next digest.
Scope.prototype.$evalAsync = function $evalAsync(expr) {
  var self = this;
  if (!self.$$phase && !self.$$asyncQueue.length) {
    setTimeout(function() {
      if (self.$$asyncQueue.length) {
        self.$digest();
      }
    }, 0);
  }
  this.$$asyncQueue.push({scope: this, expression: expr});  // why store scope? The article suggests it relates to scope inheritance.
};

Scope.prototype.$beginPhase = function $beginPhase(phase) {
  if (this.$$phase) {
    throw this.$$phase + ' already in progress.';
  }
  this.$$phase = phase;
};

Scope.prototype.$clearPhase = function $clearPhase() {
  this.$$phase = null;
};

// Takes a function and schedules it to run after the next digest has finished. It does not cause a digest to be scheduled and
// if you make changes to the scope from within $$postDigest, you should call $digest or $apply manually to make sure the
// changes are picked up.
Scope.prototype.$$postDigest = function $$postDigest(fn) {
  this.$$postDigestQueue.push(fn);
};