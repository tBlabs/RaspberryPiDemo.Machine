const { exec } = require('child_process');

exports.Exec = (command) =>
{
    console.log('Executing command "' + command + '"...');
    
    exec(command, (error, stdout, stderr) =>
    {
        if (error)
        {
            console.error(`exec error: ${ error }`);
            return;
        }
        
        if (0)
        if (stdout)
        {
            console.log(`stdout: ${ stdout }`);
        }

        if (stderr)
        {
            console.log(`stderr: ${ stderr }`);
        }
    });
}