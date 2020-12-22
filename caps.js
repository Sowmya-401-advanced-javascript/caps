'use strict';

const events = require('./events');

require('./Modules/vendor');
require('./Modules/driver');

function eventLogger(eventName, payload) {
    let currentTimestamp = Math.floor(Date.now() / 1000);
    console.log('EVENT { ' + 'event: ' + '\'' + eventName + '\',\n' + 'time: ' + currentTimestamp + ',\n' +  ' payload: ' + JSON.stringify(payload) + '}');
}

events.on('pickup', (pickupPayload) => eventLogger('pickup', pickupPayload));

events.on('in-transit', (transitPayload) => eventLogger('in-transit', transitPayload));

events.on('delivered', (deliveryPayload) => eventLogger('delivered', deliveryPayload));
