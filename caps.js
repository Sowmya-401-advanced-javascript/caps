'use strict';

require('dotenv').config();

const port = process.env.PORT || 3000;
const io = require('socket.io')(port);

// Name space for caps


function logger(eventName, payload) {
    
    let currentTimestamp = Math.floor(Date.now() / 1000);
    
    console.log('EVENT { ' + 'event: ' + '\'' + eventName + '\',\n' + 'time: ' + currentTimestamp + ',\n' + ' payload: ' + JSON.stringify(payload) + '}');
}

io.on('connection', (socket1) => {
    console.log('Welcome to the HUB', socket1.id);  
    
});

const caps = io.of('/caps');

caps.on('connection', (socket) => {
    console.log('caps: You are now connected to the CAPS system', socket.id);

    // a way for vendors to join the rooms(Private spaces)
    // So that we can send them direct messages
    socket.on('join', room => {
        console.log(`${socket.id} is joining ${room}`);
        socket.join(room);
    });

    socket.on('pickup', (pickupPayload) => {
        logger('pickup', pickupPayload);
        caps.emit('pickup', pickupPayload);
    });

    socket.on('in-transit', (transitPayload) => {
        logger('in-transit', transitPayload);
        caps.to(transitPayload.storeName).emit('in-transit', transitPayload);
    });

    socket.on('delivered', (deliveryPayload) => {
        logger('delivered', deliveryPayload);
        caps.to(deliveryPayload.storeName).emit('delivered', deliveryPayload);
    });
})


