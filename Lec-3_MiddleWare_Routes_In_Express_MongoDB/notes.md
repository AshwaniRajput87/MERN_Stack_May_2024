# What is middleware?

  - Middlewares are the functions that have access of request, response and next middleware function in the application's request-response cycle.
  - EG: get, post, put, delete, use, next i expressJS
  - use: superset middleware, if any path doesn't match then it must fallback to this middleware.

   - next(): used to pass the  control from one middleware to another middleware.

   # problem: 
     1. data is persisting in-memory (thata means data can flush out automatically if server gets killed and then re-start)
      # Solution:
        - Persist the data permamnently using database

   # what is mongodb and what does it do?
     mongodb: it's NoSQL DB that stores the data in flexible and JSOn like documents, providing high performance, scalbility and flexibilty for building any modern aplications.

     # How to install mongodb and use the altas version of mongodb?

       1. you have to register on : https://account.mongodb.com/account/register?signedOut=true
       2. Do login using your creds -> landing on the mongodb dashboard
       3. goto to database services - browse collections (can see all colections and documents and keys)

       4. install the npm i mongodb / yarn add mongodb

       5. Create a database user
       6. define 0.0.0.0/0 - in network access tab - This will allow all the users who is tring the access the mongodb.

      7. need the mongodb url: (from conncet tab)
       mongodb url:mongodb+srv://<username>:<password>@cluster0.jdq8n60.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

       8. install mongoose and dotenv


