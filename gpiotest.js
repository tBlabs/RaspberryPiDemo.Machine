/*
    THIS WILL WORK ONLY ON RASPBERRY PI!
*/
const Gpio = require('onoff').Gpio;

const led1 = new Gpio(17, 'out');
const led2 = new Gpio(18, 'out');

let value = 0;

console.log('Led test');

setInterval(()=>
{
    value = 1 - value;
    console.log('Value ' + value.toString());
    led1.writeSync(value);
    led2.writeSync(1-value);
}, 
500);


process.on('SIGINT', function ()
{
    led1.unexport();
    led2.unexport();
});

