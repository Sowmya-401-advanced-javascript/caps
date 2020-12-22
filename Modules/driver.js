'use strict';

const events = require('../events');




events.on('pickup', (pickupPayload) => {
  
  setTimeout(() => {
    console.log('DRIVER: picked up ' + pickupPayload.orderId );
    events.emit('in-transit', pickupPayload)
  }, 1000);

  setTimeout(() => {
    console.log('DRIVER: delivered ' + pickupPayload.orderId);
    events.emit('delivered', pickupPayload);
  }, 3000);
});
