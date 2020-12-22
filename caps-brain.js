'use strict';

const events = require('./event-pool');

// require our body parts so they will hear our events
require('./Modules/vendor');
require('./Modules/driver');

events.on('pickup', (payload) => {
    console.log('Pickup-package from the vendor', payload);
    events.emit('', {timestamp: payload});
})

events.on('transit', (payload) => {
    console.log('Driver is in transit', payload);
    events.emit();
})

events.on('delivered', (payload) => {
    console.log('Delivered the package', payload);
    events.emit();
})