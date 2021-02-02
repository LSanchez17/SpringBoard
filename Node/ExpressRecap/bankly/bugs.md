## Tests that are currently passing

* POST /auth/register
    √ should allow a user to register in
    **No more bugs above**
    √ should not allow a user to register with an existing username
    **NO bugs above**
* POST /auth/login
    √ should allow a correct username/password to log in
    **No Bugs above anymore**
* GET /users
    √ should deny access if no token provided
    **No bugs above**
    √ should list all users (20ms)
    **No bugs above**
* GET /users/[username]
    √ should deny access if no token provided
    **No bugs above**
    √ should return data on user
    **No bugs above**
* PATCH /users/[username]
    √ should deny access if no token provided
    **No bugs above**
    √ should deny access if not admin/right user
    **No bugs above**
    √ should patch data if admin
    **No bugs above**
    √ should disallowing patching not-allowed-field
    **No bugs above**
    √ should return 404 if cannot find
    **No bugs above**
* DELETE /users/[username]
    √ should deny access if no token provided
    **No bug above**
    √ should deny access if not admin
    **No bug above**
    √ should allow if admin
    **No Bug above**

# Bug #1
All users are defaulted to no-admin.
Event a user who is meant to be an admin, will be defaulted during user sign up.
This will prevent further changes, as it is engraved in the token.
## Fix
Add a conditional admin on the user registration.

# Bug #2
Login route did not await the authentication, meaning anyone could log in! wrong password and everything
## Fix
Added an await statement

# Bug #3
During authentication of a user for *user* routes, the token was being
decoded, and returned on the header requests.  This exposes the token!
## Fix
Add a veryfiy for the token instead of a decode, and used the **SECRET_KEY** var.

# Bug #4
Searching for a non-existant user returns an empty object instead of an error!
## Fix
The user *Get(username)* method was not throwing the new error, so if a user did not exist, it would continue as if they did!

# Bug #5
Changing a user's password, does not hash it! It stores the plain-text version on the database
## Fix
Hash if the user provides a password!

# Bug #6
Deleting a user is not being awaited.  Non-scalable software issue, as a slower connection user running the operation might not be able to make the connection to delete to the database and back, before the return statement executes.
## Fix
Added await to **User.delete** statement


