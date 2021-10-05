## Understanding callBacks

1. The problem with using callback within callback is that it creates a callBack hell.The Pyramid of doom.

```javascript
 setTimeout(function timeOutHandler(){
     getPersonfromInternet(function(){
         getLogfromInternet(function(id){
             .....
         })
     })
 }, 1000)

```

2. setTimeout just spuns up webBrowser feature but fetch does a lot of things

3. In the above code - every inner function is waiting for the timOutHandler function to complete.

4. Problems - The associated callback function(timeoutHandler()) attached to setTimout is over, but what if we want to run multiple callback after the event is completed? and what if we want to handle that callback in another function after the process is over?

5. These problems can be solved using js , but it's just messy.

## Promise

[Why use promises?] (https://stackoverflow.com/questions/22539815/arent-promises-just-callbacks/22562045#22562045)

1. A standardized approach to dealing with asynchronous events and callbacks.

2. Promise are an object that represnt an idea, the promise object represents a future value , a value that eventually we are going to get but we don't have it yet.

3. It encapsulate the idea of a web browser feature like timer, which provides a hook like setTimeout to use the timer feature and also a way to run a function after that feature has completed it's work.
   **_ After the work is completed , we assume that we have a "value" like data from a server , true or false in the FUTURE and PROMISE represents that value. _**.

4. **_ But Promise also wraps up the idea of requesting the use of that feature and handling it when the feature has completer it's work. _**

5. The JS team wanted to encapsulate or standaradized this idea of an object that represents a future value.

6. The inbuilt promise object is designed in such a way that when it's "value" property get's filled in then it's gonna trigger all the functions in the onfulfillment array.

## Custom Promise

1. We will give our promise a **_ executor _** function , this function will do the work we are talking about. For eg - fetch data from api or setTimout.

2. A promise object doesn't actually do the work , A promise object wraps up the idea of waiting for that work to complete and figuring out what to do after the work is completed.

3. It's up to the coder who is using the promise object to write the **_ executor _** function that does the work and give it to the promise and the promise will run it.

4. The Promises are designed to deal with one and done operation meaning the value will not change after it's been set.

## Using inbuilt Promise Object

1. We will not be calling the 'resolve' function ourselves , we will be using the utilities like fetch etc. Which will use the concept of promises themselves

2. **_ IMP _** - Just when you see that somehthing returns a promise , think of .then to get the resolved or the fianl value and .catch for error.

## "thennable" object

1. An object that has a "then" function.
2. So that we can use thie .then .then .then coding structure
3. Suppose we are using utility or an object that is not a promise but if that function follows the pattern of how to ".then" function works that it's thenable
