### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?
  *PostgreSQL is an open source relation database.  Follows standard SQL query/syntax.*

- What is the difference between SQL and PostgreSQL?
  *PostgreSQL has more community input which leads to some extra features like: cascade operations, JSON, multi OS compatibility, & allows for custom extensions*

- In `psql`, how do you connect to a database?
  */c DATABASE_NAME_HERE*

- What is the difference between `HAVING` and `WHERE`?
  *WHERE applies the logic to rows right away.  HAVING is applied after the rows have been grouped by or turned into groups*

- What is the difference between an `INNER` and `OUTER` join?
  *Inner shows items that correspond between the tables being compared(primary keys & foreign keys).  This results in only rows where there is a direct match.  Outer joins return rows that may not be direct matches, which often leads to empty rows.*

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?
  *L.O.J. returns rows from the first table being compared upon even if there are no direct matches from the second table.  R.O.J. returns rows from the second table first, even if there are no direct matches from the first table*

- What is an ORM? What do they do?
  *ORM means Object Relational Mapping; It's a way of converting data between different systems that may not be comaptible.*

- What are some differences between making HTTP requests using AJAX 
  and from the server side using a library like `requests`?
  *Client side requests typically deal with an external API and then back to the client.  Server Side request originate from the server itself which communicates with the external API exlusively and return the results to the browser*

- What is CSRF? What is the purpose of the CSRF token?
  *Cross Site Request Forgery; Forces a user to execute unwanted actions on a web application that they might not be authenticated for. The token is a measure of safety to avoid this from taking place*

- What is the purpose of `form.hidden_tag()`?
  *This helps against CSRFs by hiding a the CSRF Token from view*