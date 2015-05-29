##### Thunkify
```js
// Returns a function that produces thunks (a thunk factory, if you will) over a given function 'fn'.
function thunkify(fn) {
    return function() {
        var args = [].slice.call( arguments );
        return function(cb) {
            //args.push( cb );
            return fn.apply( null, args.concat( cb ) );
        };
    };
}

function foo(x, y, cb) {
    console.log(arguments);
    console.log('foo started')
    setTimeout( function(){
        console.log('foo finished');
        cb( null, x + y );
    }, 1000 );
}

var fooThunkory = thunkify( foo );

var fooThunk = fooThunkory( 3, 4 );

// later

fooThunk( function(err, sum) {
    if (err) {
        console.error( err );
    } else {
        console.log( sum );     // 7
    }
} );
```


##### Roughly Equivalent Thunkify/Promisify
```js
function promisify(fn) {
    return function() {
        var args = [].slice.call( arguments );

        return new Promise( function(resolve,reject){
            fn.apply( null,
                args.concat( function(err,v){
                    if (err) {
                        reject( err );
                    }
                    else {
                        resolve( v );
                    }
                } )
            );
        } );
    };
};

function thunkify(fn) {
    var result = {};
    var fakeCallback = function() {
        result.callbackArgs = [].slice.call( arguments );
    };
    return function() {
        var args = [].slice.call( arguments );
        if ( !result.hasOwnProperty( 'callbackArgs' ) ) {
            result.value = fn.apply( null, args.concat( fakeCallback ) );
        }
        return function(cb) {
            setTimeout( function() {
                cb.apply( null, result.callbackArgs );
            }, 0 );
            return result.value;
        };
    };
}

// symmetrical: constructing the question asker
var fooThunkory = thunkify( foo );
var fooPromisory = promisify( foo );

// symmetrical: asking the question
var fooThunk = fooThunkory( 3, 4 );
var fooPromise = fooPromisory( 3, 4 );

// get the thunk answer
fooThunk( function(err,sum){
    if (err) {
        console.error( err );
    }
    else {
        console.log( sum );     // 7
    }
} );

// get the promise answer
fooPromise
.then(
    function(sum){
        console.log( sum );     // 7
    },
    function(err){
        console.error( err );
    }
);
```