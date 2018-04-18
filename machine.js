require('dotenv').config();

var io = require('socket.io-client');
var exe = require('./exec').Exec;
var Gpio = require('onoff').Gpio;
var led1 = null;
var led2 = null;

if (process.env.HOST.includes('localhost'))
{
    console.log('Localhost dont have Raspberry Pi GPIO');
}
else
{
    console.log('Working on Raspberry Pi');
    led1 = new Gpio(17, 'out');
    led2 = new Gpio(18, 'out');
}

console.log('Starting machine...');


const socket = io(process.env.HOST + '?client_type=machine', { rejectUnauthorized: false }); // rejectUnauthorized required for host working with SSL

socket.on('connect', () =>
{
    console.log('Connected to server');
    if (led2) led2.writeSync(1);

    socket.on('human-to-machine', (cmd) =>
    {
        switch (cmd)
        {
            case 'led1on':
                console.log('Led 1 on');
                if (led1) led1.writeSync(1);
                socket.emit('machine-to-human', 'led1', 'ison');
                break;

            case 'led1off':
                console.log('Led 1 off');
                if (led1) led1.writeSync(0);                
                socket.emit('machine-to-human', 'led1', 'isoff');                
                break;

            case 'radioon':
                console.log('Radio on');
                exe('mpc play');
                socket.emit('machine-to-human', 'radio', 'ison');                
                break;

            case 'radiooff':
                console.log('Radio off');
                exe('mpc stop');
                socket.emit('machine-to-human', 'radio', 'isoff');                
                break;

            default: 
                console.log('Unknown command');
                break;
        }
    });
});

socket.on('disconnect', () =>
{
    console.log('Disconnected from server');
    if (led2) led2.writeSync(0);
});

process.on('SIGINT', function ()
{
    led1.unexport();
    led2.unexport();
});

