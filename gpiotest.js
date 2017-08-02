/*
    THIS WILL WORK ONLY ON RASPBERRY PI!
*/
const Gpio = require('onoff').Gpio;

const led1 = new Gpio(17, 'out');

let value = 0;

console.log('Led test');

setInterval(()=>
{
    value = 1 - value;
    console.log('Led ' + (value ? 'on' : 'off'));
    led1.writeSync(value);
}, 500);