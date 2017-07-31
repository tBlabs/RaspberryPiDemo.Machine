require('dotenv').config();

var io = require('socket.io-client');
var exe = require('./exec').Exec;
var Gpio = require('onoff').Gpio;
var led1 = null;

if (!process.env.HOST.includes('localhost'))
{
    led1 = new Gpio(17, 'out');
}

console.log('Starting machine...');


const socket = io(process.env.HOST + '?client_type=machine');

socket.on('connect', () =>
{
    console.log('Connected to server');

    socket.on('server-to-machine', (cmd) =>
    {
        switch (cmd)
        {
            case 'led1on':
                console.log('Led 1 on');
                if (led1) led1.writeSync(true);
                break;

            case 'led1off':
                console.log('Led 1 off');
                if (led1) led1.writeSync(false);                
                break;

            case 'radioon':
                console.log('Radio on');
                exe('mpc play');
                break;

            case 'radiooff':
                console.log('Radio off');
                exe('mpc stop');
                break;
        }
    });
});

socket.on('disconnect', () =>
{
    console.log('Disconnected from server');
});

// var Gpio = require('onoff').Gpio;
// var led = new Gpio(17, 'out');
// var button = new Gpio(4, 'in', 'both');

// let value = 0;

// setInterval(() =>
// {
//     socket.emit('is_alive');

//     // value = 1 - value;
//     // led.writeSync(value);
// }, 1000);

// process.on('SIGINT', function ()
// {
//     led.unexport();
//     button.unexport();
// });
