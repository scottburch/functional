# Functional

An attempt to create a simple functional programming library with monads.

This library started with Douglas Crockford's code used in his talk "Monads and Gonads"
<https://www.youtube.com/watch?v=b0EF0VTs9Dc>

## monads
* base (used to create other monads)
* Identity
* Maybe
* Either
* Promise
* State

## functions
* autocurry


## Intro to the monads

In this library a monad is a immutable wrapper around a value.
To access the value of a monad you must pass a function to the .bind() method.

Simplest Example:

    F.Identity('Scott').bind(function(name) {
        alert('Hello '+name);                        // Hello Scott
    });



Monads can be used to compose behavior in a reusable and flexible way by providing a common interface.
Here we will use the lift() method to compose behavior with a "Person" monad using regular functions.

    Person = F.MONAD().lift(greeting).lift(enthusiastic);

    Person('Scott').greeting().enthusiastic().bind(alert);      // Hello Scott!!!


    function greeting(v) {
        return 'Hello ' + v;
    }

    function enthusiastic(v) {
        return v + '!!!';
    }


But, what if we want to be able to combine our functions in arbitrary ways. Without knowing in advance
what we are going to do?  Easy, simply have your functions return a monad and use bind(). For ease, we will
return use the Identity monad.

    Person = F.MONAD();
    Person('Scott').bind(greeting).bind(enthusiastic).bind(alert);      // Hello Scott!!!

    function greeting(v) {
        return F.Identity('Hello ' + v);
    }

    function enthusiastic(v) {
        return F.Identity(v + '!!!');
    }

Uh Oh.  The requirement says that we have to get the greeting through Ajax.  Now we need to refactor all of our code, right?
Not really...  We just change the monad returned from greeting to a Promise.

        var Person = F.MONAD();
        Person('Scott').bind(greeting).bind(enthusiastic).bind(alert);      // Hello Scott!!!

        function greeting(v) {
            var prom = F.Promise();
            setTimeout(prom.resolve.bind(undefined, 'Hello ' + v),1000);
            return prom;
        }

        function enthusiastic(v) {
            return F.Identity(v + '!!!');
        }
### More docs to come