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

# 12 Write a *sum* method which will work properly when called with either syntax
    ```
        console.log(sum(2,3));
        console.log(sum(2)(3));
    ```
    We can use the **arguments** object, that lets us disect the parameters being passed in. So we can try this
    
    ``` 
        const sum(nums) => {
            if(arguements.length === 2){
                return arguments[0] + arguments[1];
            }
            else{
                return ((y) => { return x + y });
            }
        }
    ```

# 13 What happens when the user clicks on Button 4 and why?
    ```
    for (var i = 0; i < 5; i++) {
        var btn = document.createElement('button');
        btn.appendChild(document.createTextNode('Button ' + i));
        btn.addEventListener('click', function(){ console.log(i); });
        document.body.appendChild(btn);
   }
    ```
    oof, well first, no **var** please.  Not local context, so the variable itself is set to 5, and the eventListeners will echo 5 each time they get clicked on.  
    You can fixt this by using modern JS syntax , and watching your scope, which will avoid this jumbled mess.

# 14  Assuming *D* is an "empty" object in scope, what is accomplished below
    ```
        var d = {};
        ['zebra', 'horse'].forEach((k) => {
            d[k] = undefined;
        })
    ```
    We assign *d* the keys of zebra and horse, and they each are undefined.  This is a shorthand way to assign keys to objects if they dont have it. Commonly seen in frequency counter problems.

# 15 What will this output?
    ```
        var arr1 = "john".split('');
        var arr2 = arr1.reverse();
        var arr3 = "jones".split('');
        arr2.push(arr3);
        console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
        console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
    ```
    You will get: 
        'array 1: length=5 last=j,o,n,e,s'
        'array 2: length=5 last=j,o,n,e,s'
    It is due to the fact that arrays are merely references, and unless we declare a new array, it is a reference.  So anything we do the arr1, will be shown through arr2, and arr3.
    Also to note, *pushing* to an array, inserts the element as **ONE** element, not an array *concatination*.

# 16  What will this output?
    ```
        console.log(1 +  "2" + "2");
        console.log(1 +  +"2" + "2");
        console.log(1 +  -"1" + "2");
        console.log(+"1" +  "1" + "2");
        console.log( "A" - "B" + "2");
        console.log( "A" - "B" + 2);
    ```
    Oh boy:
        * '122';
        * '32';
        * '02';
        * '112';
        * 'NaN2';
        * NaN;
    Thanks to JS being loosely typed, and its love for automatic type conversions, we get this menagerie of answers.
    The first log, concats the *1 + "2"* into **"22"**, and then concats the last *"2"*.
    The second one, JS thinks the *+"2"* is trying to be coerced to an integer, so it does just that.  This leads to *3 + "2"*, which coerces to string, and results in "32".
    Third log, is similar to previous one, with the exception of it being negative.
    The fourth is due to the first string becoming a number, but then getting converted back to a string, and being concatinated.
    The fifth log, you cannot subtract strings, so it returns *"NaN"*, but hold your horses, because *"NaN"* can be concatenated with *"2"*, so we get **'NaN2"**.
    The last log, similar, but since you cannot add *NaN* to an actual number, we just get back *NaN*.

# 17 How can we avoid a stack overflow in the following code?
    ```
        var list = readHugeList();

        var nextListItem = function() {
            var item = list.pop();

            if (item) {
                // process the list item...
                nextListItem();
            }
            };
    ```
    You could add a *setTimeout* function call that takes the *nextListItem* as its parameter.  This helps keep the stack from overflowing, by having the event queue take care of the calls, versus the actual stack.

# 18  What is closure? Give an example
    Closure is when an inner function has access to variables defined in its parent function.  This happens when the variables is in either its own scope, its inside the current scope, and the variable can be Global. Example:
    
    ```
        const outerScope = (lexicon) => {
            let dictionaries = {...lexicon};

            const innerScope = > (innerLexicon) => {
                return ({dictionaries, innerLexicon});
            }
        }
    ```

# 19 What will this code do?
    ```
        for (var i = 0; i < 5; i++) {
	        setTimeout(function() { console.log(i); }, i * 1000 );
        } 
    ```
    It will display 5, five times.  This is due to the loop being run faster than the actual time it takes for the *setTimeout* function to **Actually** execute.

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