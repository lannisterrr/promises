const doWork = (resolve, reject) => {
  setTimeout(() => {
    resolve('hello world');
  }, 1000);
};

// I want this to run after the first function is complete or resolve , and we don't know when that function will be complete
const dootherWork = (resolve, reject) => {
  setTimeout(() => {
    resolve('How are you world?');
  }, 3000);
};

let someText = new Promise(doWork);

// # promblem - you wil think that two handlers are attached to the original promise i.e 'someText'
// But 1 handler is attached to the original promise and a new handler is attached to the new promise returned from '.then'
// .then always returns a promise

// Built in javascript promise object has a feature -
// 1.IMP - When my handler returns a value , it wraps that value up in a promise
// 2. SO that I continue this approach to coding my response to the asynchrounous process completing even if my returned value is not created asynchronously

//CLEVER -  here my function returned a promise but '.then' always returns a promise
// but the promise that '.then' returns in this case is synced up with the promise that I return

// In other words - If the promise that I return 'resolves' and the promise create by '.then' resolves then , both of them will have the same value
// It effectivly suggests that I adding a promise to new promise at line 33.

someText
  .then(val => {
    console.log('1st log: ' + val);
    return new Promise(dootherWork);
  })
  .then(val => {
    console.log(val);
  });

/**
 * Flattnig the pyramid by chaining .then
 * Inside every .then , I can have a new asynchronous process that will return a promise,
 * and the promise object code will make sure that each '.then' only run when the promise resolves.
 * So we can hava sequence that work properly and flatten the pyramid.
 *IMP-  We will use a sequence of '.then' and each '.then' is attached to the new Promise, generated from the previous funciton return
 */
