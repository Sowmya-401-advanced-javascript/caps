'use strict';

require('dotenv').config();

const port = process.env.PORT || 3000;

const io = require('socket.io')(port);

const caps = io.of('/caps-system');

function logger(eventName, payload) {
    
    let currentTimestamp = Math.floor(Date.now() / 1000);
    
    console.log('EVENT { ' + 'event: ' + '\'' + eventName + '\',\n' + 'time: ' + currentTimestamp + ',\n' + ' payload: ' + JSON.stringify(payload) + '}');
}

caps.on('connection', (socket) => {
    console.log('caps: You are now connected to the CAPS system', socket.id);

    socket.on('pickup', (pickupPayload) => {
        logger('pickup', pickupPayload);
        caps.emit('pickup', pickupPayload);
    })

    socket.on('in-transit', (transitPayload) => {
        logger('in-transit', transitPayload);
        socket.emit('in-transit', transitPayload);
    })

    socket.on('delivered', (deliveryPayload) => {
        logger('delivered', deliveryPayload);
        socket.emit('delivered', deliveryPayload);
    })
})
