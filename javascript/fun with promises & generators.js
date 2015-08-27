function run(gen) {
    var args = [].slice.call( arguments, 1), it;

    // initialize the generator in the current context
    it = gen.apply( this, args );

    // return a promise for the generator completing
    return Promise.resolve()
        .then( function handleNext(value){
            // run to the next yielded value
            var next = it.next( value );

            return (function handleResult(next){
                // generator has completed running?
                if (next.done) {
                    return next.value;
                }
                // otherwise keep going
                else {
                    return Promise.resolve( next.value )
                        .then(
                            // resume the async loop on
                            // success, sending the resolved
                            // value back into the generator
                            handleNext,

                            // if `value` is a rejected
                            // promise, propagate error back
                            // into the generator for its own
                            // error handling
                            function handleErr(err) {
                                return Promise.resolve(
                                    it.throw( err )
                                )
                                .then( handleResult );
                            }
                        );
                }
            })(next);
        } );
}

function request(arg) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log("resolving promise with: " + arg);
      resolve(arg);
    }, Math.random()*5000 + 500);
  });
}

function *foo() {
    // make both requests "in parallel"
    var p1 = request( "1" );
    var p2 = request( "2" );

    // wait until both promises resolve
    var r1 = yield p1;
    var r2 = yield p2;

    var r3 = yield request( "3:" + r1 + "," + r2 );

    console.log( r3 );
}
/* Alternative (works the same)
function *foo() {
    // make both requests "in parallel," and
    // wait until both promises resolve
    var results = yield Promise.all( [
        request( "1" ),
        request( "2" )
    ] );

    var r1 = results[0];
    var r2 = results[1];

    var r3 = yield request( "3:" + r1 + "," + r2 );

    console.log( r3 );
}
*/

// use previously defined `run(..)` utility
run( foo );