'use strict'; 
require('dotenv').config();

const io = require('socket.io-client');
const host = "http://localhost:3000";
const capsConnectionSocket = io.connect(`${host}/caps-system`);

const faker = require('faker');

setInterval(() => {
    const storeName = process.env.STORENAME;
    const storeId = process.env.STORE_ID;
    const orderId = faker.random.uuid();
    const customerName = faker.name.firstName();
    const customerAddress = faker.address.streetAddress();

    const fakeOrder = {
        storeName: storeName,
        storeId: storeId,
        orderId: orderId,
        customerName: customerName,
        customerAddress: customerAddress
    };

    capsConnectionSocket.emit('pickup', fakeOrder);
}, 5000);


capsConnectionSocket.on('delivered', (pickupPayload) => {
    console.log('Thank you for delivering ' + pickupPayload.orderId );
});

