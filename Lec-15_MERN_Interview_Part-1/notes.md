1. What is nodeJS? What are the main feature of nodeJS?
 - NodeJS is open-source, server-side Javascript runtime enviornment that executes the JS code outside the browser.
 - It allows developers to build scalable network applications, leveraging the event-driven, non-blocking I/O model for the efficiency.

 # main features of nodeJS:

  1. Asyschronous and event-driven
  2. Single-threaded and event-loop
  3. NPM (Node package Manager)
  4. Runtime enviornment
  5. cross-platform
  6. Extensive ecosystem
  7. Built-in httpServer

  2. Browser vs nodeJS environment:

      Browser:
       - provides a runtime env at the client side, that eanbles the interaction with the web pages which helps the user to interact with that web page.

       - APIs and global object:

          - Web APIs, likewise fetch, DOM, storages etc and window object.


      NodeJS:

        - provides a runtime enn at the server-side. It extends the capabilities to interact with the file system, perform network operations and run the appalcations outside the browser.

        - Node API: fs, http, os, path etc and global object: process global object (process.env)

3. Node Modules:

1. fs
2. http
3. path
4. os

References: 
1. https://flaviocopes.com/nodejs/
2. https://flaviocopes.pages.dev/books/node-handbook.pdf
3. https://nodejs.org/docs/latest/api/os.html#oscpus
4. https://www.npmjs.com/package/cookie-parser


Project-1: Assignment
---------------------

1. Create a project to scan the files in downoloads folder and categories them as compressed(rar, zip, 7zip files) , documents(txt, pdf, docx etc), audio,and video files.

o/p:

  docs
    - all pdf/docx/txt files

   compressed
    - all rar, zip files

    or

O/P:

  pdf
    - all pdf files
   docx
    - all words files
   zip
    - all zip files

Algo Impl:
----------

1. Read downloads directory: use fs.readdir or fs.readdirSync to list down all files inside the downloads directory
2. categorise files: loop through the files, use the path module to extract the extention
3. path.extname(path): return you the extention
4. Move files: fs.rename() and fs.copyFile()
