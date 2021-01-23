# 1 Pitfalls of using === on typeof comparisons?
    Null may be considered an object, as in the beginning, everything was designed to BE an object. You'd have to have special case to make sure whatever it is you are checking, is not null first, then compare it.

# 2 What does the following output?
    ```
    (function(){
        var a = b = 3;
    })();

    console.log("a defined? " + (typeof a !== 'undefined'));
    console.log("b defined? " + (typeof b !== 'undefined'));
    ```
    b is defined, while a, is not.  This is because of the shorthand statement inside the scope of the function. Since we don't declare what b IS, it is elevated to a global variable, able to be accessed outside the functions scope, yikes!

# 3 What does this output?
    ```
    var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
    };
    myObject.func();
    ```
    The code outputs in the first console.log blocks, bar, and bar.
    In the second instance of the console.log blocks, the code outputs undefined, and bar.
    The reason for this is the context of *this* is lost inside the anonymous function call.

# 4 Why do we wrap the entire content of a JS source file ina funtion block?
    Closure! It helps avoid global collisions with other parts of the application that might share similar names down the road, or with other libraries/modules.

# 5 Why is *use strict* a thing?
    It enforces JS to use stricter parsing and error handling during runtime.  It brings up code errors that are typically ignored/silenced at run time.  It will help you debug better, avoids name coliisions, avoids duplicate parameters for functions, takes away *this* coercion, to name a few
    
# 6 Are these equal?
    ```
    function foo1()
    {
        return {
            bar: "hello"
        };
    }

    function foo2()
    {
        return 
        {
            bar: "hello"
        };
    }
    ```
    Nope.  Why? Because semicolons are a thing.  If JS encounters the *return* statement, and nothing else, it simply executes return, ignoring the object that should be returned.
    Point being don't forget your ;, and leave a *{* at the end of a line.

# 7 What is NaN? Its type? How to test for it?
    *NaN* is representative of Not a Number. Typically arises out of operations involving items that are not numbers, mixing with ones that *are* numbers.  
    Surprisingl, *Nan*, *IS* a number. shocker, right?
    Now for even more wacky hijinks, comparing *NaN* to ANYTHING, results, in **false** being the result.
    The sorta working of checking, can be done through *isNaN()*, but even that has limitations, so thread carefully.

# 8 What does this output?
    ```
    console.log(0.1 + 0.2);
    console.log(0.1 + 0.2 == 0.3);
    ```
    Here, yet again, is JS being wonky funky. The output will be, roughly, **0.30000000000000004**, and **false**.
    Now how do we deal with this? A good workaround is using the following..

    ```
    function areTheNumbersAlmostEqual(num1, num2) {
	    return Math.abs( num1 - num2 ) < Number.EPSILON;
    }
    console.log(areTheNumbersAlmostEqual(0.1 + 0.2, 0.3));
    ```

# 9 How could youw rite a Fn *isIntegers(x)*, that determines whether *x* **is** an integer?
    You could simply check for *typeof* x, and determine it that way, just watch out for +-Infinity.  You can also do the following, ECMAScript 6, method, *Number.isInteger()* which answers this question precisely.

# 10 Which order is outputted here?
    ```
    (function() {
        console.log(1); 
        setTimeout(function(){console.log(2)}, 1000); 
        setTimeout(function(){console.log(3)}, 0); 
        console.log(4);
    })();
    ```
    The following is outputted:
    * 1
    * 4
    * 3
    * 2
    This is because the *setTimeout* calls, even with a 0 second delay, take backseat.  The event loop is neat, hu?

# 11  Write a Fn that returns a boolean for whether a string is a palindrome or not
    ```
    const amIPalindrome = (text) => {
	    let reverse='';
        for(let i=text.length-1; i>-1; i--){
      	    reverse += text[i];
        }
        return reverse.toLowerCase() === text.toLowerCase();
    }
    ```
    Runtime, **O(n)** where n is the string length.

# 12
# 13
# 14
# 15
# 16
# 17
# 18
# 19
# 20
# 21
# 22
# 23
# 24
# 25
# 26
# 27
# 28
# 29
# 30
# 31
# 32
# 33
# 34
# 35
# 36 
# 37