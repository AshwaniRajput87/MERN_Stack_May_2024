/***
   EventEmitter Base class: it's a special class which is a built-in class used for allowing the object to communicate each other by emitting an event and listening to them.

   think like sending and recieving the messages.

   Emitting Event: an object of EventEmitter class needs to create that can send the events.These events are identified by the name (message, create_grp, data, error)

   Listening to events: you have to listen those events.


   How to create custom events?

 */


 const EventEmitter = require('events');

 const eventEmitter = new EventEmitter();

eventEmitter.on('myEvent', (...args)=>{

  console.log('There are arguments:', args);
})



eventEmitter.emit('myEvent');
eventEmitter.emit('myEvent', 1,2);
eventEmitter.emit('myEvent', [1,2,3]);