require('dotenv').config();

var io = require('socket.io-client');
var exe = require('./exec').Exec;
var Gpio = require('onoff').Gpio;
var led1 = null;

if (process.env.HOST.includes('localhost'))
{
    console.log('Localhost dont have Raspberry Pi GPIO');
}
else
{
    console.log('Working on Raspberry Pi');
    led1 = new Gpio(17, 'out');
}

console.log('Starting machine...');


const socket = io(process.env.HOST + '?client_type=machine', { rejectUnauthorized: false }); // rejectUnauthorized required for host working with SSL

socket.on('connect', () =>
{
    console.log('Connected to server');

    socket.on('server-to-machine', (cmd) =>
    {
        switch (cmd)
        {
            case 'led1on':
                console.log('Led 1 on');
                if (led1) led1.writeSync(1);
                break;

            case 'led1off':
                console.log('Led 1 off');
                if (led1) led1.writeSync(0);                
                break;

            case 'radioon':
                console.log('Radio on');
                exe('mpc play');
                break;

            case 'radiooff':
                console.log('Radio off');
                exe('mpc stop');
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
});

process.on('SIGINT', function ()
{
    led.unexport();
});

