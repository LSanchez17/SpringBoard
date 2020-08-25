### Conceptual Exercise

Answer the following questions below:

- What is RESTful routing?
*Making sure your routes or API endpoints follow a standardized protocol.  Usually allows for GET, PUT, POST/PATCH, DELETE requests to a single endpoint(s)*

- What is a resource?
 *An object with a type,data,relationship to other resources within the API.  It can interact with methods and is usually used in connection with a RESTful route*

- When building a JSON API why do you not include routes to render a form that when submitted creates a new user?
*The form itself should reference a route with a POST method since we want to keep statelessness.*

- What does idempotent mean? Which HTTP verbs are idempotent?
*Means that the same operation returns the same answer with the given data each time.  GET, PUT/PATCH, DELETE*

- What is the difference between PUT and PATCH?
*PUT looks for a resource in the endpoint, if it exists it updates it, else it creates it.  PATCH is mainly used to modify a part(s) of an already existing resource*

- What is one way encryption?
*A function that turns a set of characters into a hashed set of new characters.  Can be hard to reverse engineer, but not impossible*

- What is the purpose of a `salt` when hashing a password?
*Salt is a method to make it harder to reverse a hash.  It adds a new set of parameters to include inside the hash function*

- What is the purpose of the Bcrypt module?
*To hash a user password along with some salt, X number of times depending on how much resource power you watn to use*

- What is the difference between authorization and authentication?
*Authorization is allowing a user to do something, while authentication is making sure a user is who they claim to be*
