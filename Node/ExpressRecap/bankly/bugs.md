## Jest output
 POST /auth/register
    √ should allow a user to register in (140ms)
    √ should not allow a user to register with an existing username (13ms)
  POST /auth/login
    √ should allow a correct username/password to log in (13ms)
  GET /users
    √ should deny access if no token provided (12ms)
    √ should list all users (14ms)
  GET /users/[username]
    √ should deny access if no token provided (10ms)
    √ should return data on u1 (10ms)
  PATCH /users/[username]
    √ should deny access if no token provided (8ms)
    √ should deny access if not admin/right user (9ms)
    √ should patch data if admin (9ms)
    √ should disallowing patching not-allowed-fields (8ms)
    √ should return 404 if cannot find (9ms)
  DELETE /users/[username]
    √ should deny access if no token provided (10ms)
    √ should deny access if not admin (10ms)
    √ should allow if admin (14ms)



## Bug#1
A user can log in with an incorrect password
## Bug#2

## Bug#3

## Bug#4

## Bug#5

## Bug#6

## Bug#7
Removed extra export module for app