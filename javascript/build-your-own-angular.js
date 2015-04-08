// Source: Tero Parviainen - https://vimeo.com/96717804

// Framework

function createInjector() {

  var instanceCache = {};
  var providerCache = {};
  
  function constant(key, value) {
    instanceCache[key] = value;
  }
  
  function factory(key, factoryFn) {
    providerCache[key] = factoryFn;
  }
  
  function service(key, Constructor) {
    factory(key, function() {
      var LocalConstructor = function() {};
      LocalConstructor.prototype = Constructor.prototype;
      var instance = new LocalConstructor();
      invoke(Constructor, instance);
      return instance;
    });
  }
  
  function invoke(fn, self) {
    var argsString = fn.toString().match(/function\s*[^\(]*\(([^\)]*)\)/)[1];
    var args = argsString.split(',').map(function(arg) {
      return arg.replace(/\s*/g, '');
    });
    var deps = args.map(function(arg) {
      if (instanceCache.hasOwnProperty(arg)) {
        return instanceCache[arg];
      } else if (providerCache.hasOwnProperty(arg)) {
        var provider = providerCache[arg];
        var instance = invoke(provider);
        instanceCache[arg] = instance;
        return instance;
      }
    });
    return fn.apply(self, deps);
  }

  return {
    constant: constant,
    factory: factory,
    service: service,
    invoke: invoke
  };
}

// App

function launchMissiles() {
  console.log("Missiles launched at "+new Date());
}

function BigRedButton(buttonTarget) {
  this.target = buttonTarget;
}

BigRedButton.prototype = {
  openLid: function() { this.open = true; },
  closeLid: function() { this.open = false; },
  press: function() {
    if (this.open) {
      this.target();
    } else {
      throw 'Cannot press while lid closed.';
    }
  }
};

var water = {
  fluoridated: true
};

function defend(substance, button) {
  if (substance.fluoridated) {
    button.openLid();
    button.press();
    button.closeLid();
  }
}

var injector = createInjector();
injector.constant('substance', water);
injector.service('button', BigRedButton);
injector.constant('buttonTarget', launchMissiles);
/*
injector.factory('button', function(buttonTarget) {
  return new BigRedButton(buttonTarget);
});
*/

injector.invoke(defend);
//defend(water, new BigRedButton(launchMissiles));