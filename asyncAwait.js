const doWork = (resolve, reject) => {
  setTimeout(() => {
    resolve('Hello world');
  }, 1000);
};

const doOtherWork = (resolve, reject) => {
  setTimeout(() => {
    resolve('Hello India');
  }, 1000);
};

// these promises gets resolved in order , the second promise waits for 1st promise to be resolved

async function doAllWork() {
  const someText = new Promise(doWork);
  const text1 = await someText;
  console.log(text1);

  const otherText = new Promise(doOtherWork);
  const text2 = await otherText; // this function will wait "TWICE" for both of the promises to be resolved and in the proper order
  console.log(text2);
}

doAllWork();
console.log('Done!');

/**
 * Async function tells the JS engine to 'await' for one thing inside this engine and we are awaitng a "Promise"
 * When the JS engine reaches this await keyword, the execution context is paused
 * in other words , it is set aside , and regular function invokation and execution continues and that will sit there untill the promise being awaited for 'resolves'.
 * after getting the value that the promise represents we get thrown back to the execution stack
 */

// This syntactic sugar makes our code look like synchrounous code
