### Conceptual Exercise

---

## Answer the following questions below:

---

### 1.What are important differences between Python and JavaScript?

##  python has no let/const.  python functions and variables aren't objects like javascript.  javascript uses ; to end a line, and is not white space sensitive.  python is also strongly typed javscript is for the front end, python for the back end

### 2.Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you can try to get a missing key (like "c") *without* your programming crashing. 

## try/catch where you try to find c, and if it is not then you go to the catch and actualize a c key with a value of your choice.  You can also just do dictionary[newkey] = somevalue

### 3.What is a unit test?

## tests a function or class method to make sure it works each and every time, returns the data its supposed to, etc.  Mainly focused on testing indidivual pieces or chunks of code

### 4.What is an integration test?

## Tests that a part of the program works together, IE a server request being rendered on the webpage for a user

### 5.What is the role of web application framework, like Flask?

## To provide a sandbox to create server applications without the need to do the heavylifting of making HTTP requests at each and every line of code.  Allows for modularity no matter what system is being used, and can be outfitted with tons of python libraries to suit the needs of the project.

### 6.You can pass information to Flask either as a parameter in a route URL (like '/foods/pretzel') or using a URL query param (like 'foods?type=pretzel'). How might you choose which one is a better fit for an application? 

## The first choice would work best when you are visiting several pages under a direct route that has several dynamic subroutes.  The second works best if you are searching for something, or submitting data to the application itself

### 7.How do you collect data from a URL placeholder parameter using Flask?

## when you are doing your route, include the parameter name in the function's parameters.  Like so: 
  @app.route('/somepage/<param_name>)
  def some_func(param_name):...

### 8.How do you collect data from the query string using Flask?

## params.get['param_name'] or request.form['param_name']

### 9.How do you collect data from the body of the request using Flask?

## use request.get_data() which will give you the entire data raw, after getting this, you can use other methods to modify it.

### 10.What is a cookie and what kinds of things are they commonly used for?

## Stores data on the users browser. Varies on what it stores, depending on the application code. Commonly used to remember small settings or users preferences

### 11.What is the session object in Flask?

## A fancier, signed(secured), cookie-like object that carries information about the user that the application can then use

### 12.What does Flask's `jsonify()` do?

## Turns a server response into JSON so that it can be read by the front end/javascript


### 13.What was the hardest part of this past week for you?

## Writing out tests for my application and making sure they pass

### 14.What was the most interesting?

## Learning how to align my code to match my tests and vice versa
