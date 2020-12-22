'use strict'; 
require('dotenv').config();
const faker = require('faker');
const events = require('../events');


setInterval(() => {
    const storeName = process.env.STORENAME;
    const orderId = faker.random.uuid();
    const customerName = faker.name.firstName();
    const customerAddress = faker.address.streetAddress();

    const fakeOrder = {
        storeName: storeName,
        orderId: orderId,
        customerName: customerName,
        customerAddress: customerAddress
    };

    events.emit('pickup', fakeOrder);
}, 5000);


events.on('delivered', (pickupPayload) => {
    console.log('VENDOR: Thank you for delivering ' + pickupPayload.orderId );
});

