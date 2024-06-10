# static website vs dynamic website

  - History of amazon website: https://www.versionmuseum.com/history-of/amazon-website

  # static websites:
    - Earlier the websites were the static content which serves the same content to every user.
  # dynamic websites:
    -  Every user gets the tailored experience.

  # how it is being tailored for different users?
    - cookies: (4kb of data can be stored)
       - a client-side storage
       - stores the data in key: value format.

  # What cookie can do?
    - Remember the login information
    - storing user prefernces data
    - tracking user behavior

  # Talk about httpOnly cookie:
    - httpOnly cookie is a server side cookie and it's a read only.
    - It can't be tempered.
    - refer the notes from notepad, how how httpOnly cookie sent from the server.

  # To access any httpOnly cookie, we need cookieparser
    - npm i cookie-parser / yarn add cookie-parser 


  # Authentication:
     - A process of verifying the claimed identity is valid and accurate.

        - login, otp, biometric
        - web token (JWT)


  # Authorisation:
    -  A process of deteremining what actions and resources an authenticated user is permitted to access within the application.

       - an admin user can able to create/update/delete the product data.

  # Identification:

    - A process of stating that who you are?

       -  user preferences

  # what is web token?
     - Refer the notes mentioned ipad notes as PDF

     - yarn add jsonwebtoken


