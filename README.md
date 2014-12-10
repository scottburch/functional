# Functional

An attempt to create a simple functional programming library with monads.

This library started with Douglas Crockford's code used in his excellent talk "Monads and Gonads"
<https://www.youtube.com/watch?v=b0EF0VTs9Dc>

As always, feedback is very welcome.

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

In this library a monad is a wrapper around an immutable value.
To access the value of a monad you must pass a function to the .bind() method.

Simplest Example:

    F.Identity('Scott').bind(function(name) {
        alert('Hello '+name);                        // Hello Scott
    });



Monads can be used to compose behavior in reusable and flexible ways by providing a common interface.
Here we will use the lift() method to compose behavior with a "Person" monad using regular functions.

    Person = F.MONAD().lift(greeting).lift(enthusiastic);

    Person('Scott').greeting().enthusiastic().bind(alert);      // Hello Scott!!!


    function greeting(v) {
        return 'Hello ' + v;
    }

    function enthusiastic(v) {
        return v + '!!!';
    }


But, what if we want to be able to combine our functions in arbitrary ways, without knowing in advance
what we are going to do?  Easy! Simply have your functions return a monad and use bind().

    Person = F.MONAD();
    Person('Scott').bind(greeting).bind(enthusiastic).bind(alert);      // Hello Scott!!!

    function greeting(v) {
        return F.Identity('Hello ' + v);
    }

    function enthusiastic(v) {
        return F.Identity(v + '!!!');
    }

Uh Oh.  The requirement says that we have to get the greeting through ajax.  Now we need to refactor all of our code, right?
Not really...  We just change the monad returned from greeting() to a Promise.

        var Person = F.MONAD();
        Person('Scott').bind(greeting).bind(enthusiastic).bind(alert);      // Hello Scott!!! (one second later)

        function greeting(v) {
            var prom = F.Promise();
            setTimeout(prom.resolve.bind(undefined, 'Hello ' + v),1000);
            return prom;
        }

        function enthusiastic(v) {
            return F.Identity(v + '!!!');
        }

#### It's too easy.  That can't work.
<http://jsfiddle.net/886753x7/5/>


### More docs to come