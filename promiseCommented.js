// Creating our own promise object

// 1. It's representing a value after a work is completed

const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function customPromise(executor) {
  // we are wating for the work to complete
  let state = PENDING;
  // that value that we are waiting for starts out as null and eventually a success or an error
  let value = null;
  // Problem - what if you want to run multiple callBack functions after the work is complete. SO I will have array of handlers
  let handlers = [];
  let catches = []; // array of functions if something goes wrong

  // If the work is done and you have a resulting value , then the 'resolve' function wil be called by the 'executor'.
  // and the executor function wil call the resolve function that's on the promise object and give the value that is just revieved by the coder(YOU)

  function resolve(result) {
    if (state !== PENDING) return; // if we are not pending anymore , I am not going to resolve

    // but if it's in the pending state and you called resolved meaning state is fulfilled
    state = FULFILLED;

    // the internal 'value' will be whatever executor function gave to me
    value = result;

    // now I will run all the 'handler' functions.
    // For every handler function in the array , I will execute the handler function and give each of these handling functions the 'value' that just came back.
    // handler are functions that are added using '.then'
    handlers.forEach(h => h(value));
  }

  function reject(error) {
    if (state !== PENDING) return;

    state = REJECTED;
    value = error;
    catches.forEach(c => c(err));
  }

  // in .then = either execute the callBack immediately
  // or we push it into the array of callbacks, which will run when the promise is resolved or when the resolved function is called
  // ### THis solves the problem of : performing more than 1 callback when the work is complete
  // Every time we are calling a '.then' we are adding a handler(func) to an array.
  // So that the array is used when we have a value to resolve

  // any handler added after the resolve is complete is simply executed

  this.then = function (callback) {
    if (state === FULFILLED) {
      // if the promise is resolved just run it
      callback(value);
    } else {
      handlers.push(callback);
    }
  };

  // 2nd half of what a promise does to solve the pyramid of doom
  // what if I have a sequence of asynchronous processes like in callback hell example
  // This problem can be solved if our ".then" function returns a promise
  // because if my callback does something , that requires us to wait for a return value, then I could chain a sequence of '.then' .
  // I could flatten the pyramid

  // a promise represents a process that is already running, the creation of a promise runs the executor function that we give it
  executor(resolve, reject); // 1st thing that runs
}

// this will get resolved after 1000
const executorFunction = (res, rej) => {
  // waiting for work to be done

  setTimeout(() => {
    res('Hello world');
  }, 1000);
};

// so when I create a promise it will represent a future value and I will give it my executor function
let someText = new customPromise(executorFunction);

// adding a function to a array of handlers

someText.then(value => {
  console.log('1st log: ' + value);
});
