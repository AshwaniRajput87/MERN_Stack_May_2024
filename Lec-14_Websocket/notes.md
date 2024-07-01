# Link : https://socket.io/docs/v4/tutorial/introduction

# <!-- socket io -->
    <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"
        integrity="sha384-mZLF4UVrpi/QTWPA7BjNPEnkIfRFn4ZEO3Qt/HFklTJBj/gBOV8G3HcKn4NfQblz"
        crossorigin="anonymous"></script>
        or
    <script src="socket.io/socket.io.js"></script>
    <script src="script.js"></script>
---------------------------------------------------------------------------

# Websocket:
   - Please refer the notes

# WS implementation:

   About Websocket.io: https://socket.io/docs/v4/

   Server side -> use socket.io API:https://socket.io/docs/v4/server-api/
    1. To install socket.io at server side: yarn add socket.io
    2. To follow the implementation part of WS: https://socket.io/docs/v4/server-installation/
    3. Socket.IO is a library that enables low-latency, bidirectional and event-based communication between a client and a server

    Client side:
    1. require script at client side: <script src="socket.io/socket.io.js"></script>
    2. create instance of io: 
    const socket = io();


    # How to create a room/group in web socket?

      - Socket.io provides a powerful feature called as "rooms" that allows users to organise the socket into differnt groups.

      - Rooms are way to segregate the clients based on certain criteria so the specific messages can be shared into that room only.

