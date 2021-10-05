fetch('https://quick-access-api.desaihetav.repl.co/')
  .then(response => response.json())
  .then(data => console.log(data));

// fetch returns a promise i.e an object built into JS that knows how to deal with asynchronous events and callbacks
// I will have a '.then' and I will be able to use the special kind of object that comes along with fetch for handling response i.e a stream of data
// And on that resonse I can call .json().
// response.json() does return a promise as well (as it waits for the body to load)
// .json() returns a PROMISE
// and so I can use .then to get the final result.

/**
 * Because you receive the response as soon as all headers have arrived. Calling .json() gets you another promise for the body of the http response that is yet to be loaded.
 */

/**
 * If your question is "why isn't response.json an attribute?",
 * then that would have required fetch to delay returning its response until the body had loaded, which might be OK for some, but not everyone.
 */

/**
 * Because somtimes we need a precise control for the loading process (from recieving the first piece of data to recieving the last one).
In actual world, json may not be a good example cause it's reletively samll. But imaging a situation where a large picture is loaded gruadually (from mosaic to clear). 
In that case, it is too late to inform the program when the data recieving has done completely.
Since fetch() is a relatively low level api, otherwise you could use axios or so on.
 */

// https://stackoverflow.com/questions/37555031/why-does-json-return-a-promise

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
