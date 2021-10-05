const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function customPromise(executor) {
  let state = PENDING;
  let value = null;
  let handlers = [];
  let catches = [];

  function resolve(result) {
    if (state !== PENDING) return;
    state = FULFILLED;

    value = result;
    // each function in the handler should recieve what get's passed in the resolve as an argument
    handlers.forEach(h => h(value));
  }

  function reject(error) {
    if (state !== PENDING) return;

    state = REJECTED;
    value = error;
    catches.forEach(c => c(err));
  }

  this.then = function (callback) {
    if (state === FULFILLED) {
      callback(value);
    } else {
      handlers.push(callback); // in start every callback function in '.then' gets pusshed into the handlers array and executed at line 17.
    }
  };

  executor(resolve, reject); // 1st thing that runs
}

const executorFunction = (res, rej) => {
  setTimeout(() => {
    res('Hello world');
  }, 1000);
};

let someText = new customPromise(executorFunction);

function thenCallback(value) {
  console.log('1st log: ' + value);
}

someText.then(thenCallback);

someText.then(value => {
  console.log('2nd log: ' + value);
});

// adding handlers after the promise has been resolved
setTimeout(() => {
  someText.then(value => {
    console.log('3rd log: ' + value);
  });
}, 3000);
